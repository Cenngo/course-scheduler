import {createContext} from "react";
import {useLocalStorage} from "./Hooks";
import {CourseContext} from "./CourseContext";

export const FavouritesContext = createContext(null);

export function useFavourites()
{
    return FavouritesContext;
}

export function FavouritesContextProvider({children, ...props})
{
    const [storage, setStorage] = useLocalStorage();
    let favourites = storage["favourites"] ?? [];

    const addFavourite = (crn) => {
        setStorage({favourites: [crn, ...favourites]});
    }
    const removeFavourite = (crn) => {
        setStorage({favourites: [...favourites?.filter(x => x !== crn)]});
    }

    const clearFavourites = () => {
        setStorage({favourites: []});
    }

    let value = {
        favourites,
        addFavourite,
        removeFavourite,
        clearFavourites
    }

    return <FavouritesContext.Provider value={value} {...props}>
        {children}
    </FavouritesContext.Provider>;
}