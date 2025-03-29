import { useCallback, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

declare global {
  interface Window {
    google: any;
  }
}
// import { completeTask } from "app/services/workflow";
// import { useDispatch } from "react-redux";
// import { notificationOperations } from "app/store/state/notification";
export const useDebounce = (handler: any, delay: any) => {
  return useCallback(
    debounce((...args) => handler(args), delay),
    [handler]
  );
};

export const useMountEffect = (func: any) => useEffect(func, []);

// export const useCompleteTaskHandler = (taskName) => {
//   const [isTaskComplete, setTaskComplete] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const dispatch = useDispatch();
//   const completeTaskHelper = async (variables = {}) => {
//     setIsError(false);
//     setIsLoading(true);
//     try {
//       const res = await completeTask(taskName, variables);
//       if (!res.isTaskAlreadyComplete) {
//         dispatch(notificationOperations.fetchUserTask());
//       } else {
//         console.log(`[Workflow] Not fetching tasks as task already completed!`);
//       }
//       setTaskComplete(true);
//     } catch (error) {
//       setIsError(true);
//     }
//     setIsLoading(false);
//   };
//   return [{ isTaskComplete, isLoading, isError }, completeTaskHelper];
// };

interface PlaceDetailsOptions {
  hidePlaceNameInStreetAddress?: boolean;
}

export const usePlaceDetails = (options: PlaceDetailsOptions = {}) => {
  const getPlaceDetails = (place_id: any, setPlaceResponse: any) => {
    try {
      var request = {
        placeId: place_id
      };
      const google = window.google;
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(request, callback);
      let city_locality: string | null = null;
      let city_sublocality: string | null = null;
      let postal_town: string | null = null;
      function callback(place: any, status: any) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const address_components = place.address_components;
          console.log('address_components', address_components);
          const location = place.geometry.location;
          interface PlaceDetails {
            country: any;
            phone_number?: string | null;
            name?: string;
            state?: string;
            postal_code?: string;
            street_address?: string;
            location?: {
              type: string;
              coordinates: [number, number];
            };
            city?: string | null;
          }
          let place_details: PlaceDetails = {
            country: undefined
          };
          place_details.phone_number = place.formatted_phone_number ? place.formatted_phone_number.replace(/[^0-9]+/g, '') : null;
          place_details.name = place.name;
          for (let i = 0; i < address_components.length; i++) {
            let loc = address_components[i];
            let loc_types = loc.types;
            if (loc_types.indexOf('administrative_area_level_1') !== -1) {
              place_details.state = loc.long_name;
            }
            if (loc_types.indexOf('locality') !== -1) {
              city_locality = loc.long_name;
            }
            if (loc_types.indexOf('sublocality_level_1') !== -1) {
              city_sublocality = loc.long_name;
            }
            if (loc_types.indexOf('postal_town') !== -1) {
              postal_town = loc.long_name;
            }
            if (loc_types.indexOf('postal_code') !== -1) {
              place_details.postal_code = loc.long_name;
            }
            if (loc_types.indexOf('country') !== -1) {
              place_details.country = loc.long_name;
            }
          }
          const parseStreetAddress = (str_address: any) => {
            const addresslines = str_address.split(/<span class="locality">/);
            const parsed_address = addresslines.length === 2 ? addresslines[0] : str_address;
            return parsed_address.replace(/<(\/)?[^>]+>/g, '').replace(/ *, *$/, '');
          };
          let street_address = parseStreetAddress(place.adr_address);
          if (options.hidePlaceNameInStreetAddress) {
            place_details.street_address = `${street_address}`;
          } else {
            place_details.street_address = `${place.name}`;
            if (street_address) {
              if (street_address.indexOf(place.name) !== 0) {
                place_details.street_address += ` , ${street_address}`;
              } else {
                place_details.street_address = `${street_address}`;
              }
            }
          }
          if (location) {
            place_details.location = {
              type: 'Point',
              coordinates: [location.lat(), location.lng()]
            };
          }
          place_details.city = city_locality || city_sublocality || postal_town;
          setPlaceResponse(place_details);
        }
      }
    } catch (error) {
      setPlaceResponse(error);
    }
  };
  return [getPlaceDetails];
};
