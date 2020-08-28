import React, { useContext } from "react";

import { store } from "./Store";
import access from "../util/access";

function imgutil() {
    // debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store); const username = shareContext.state.username;
    const setMessage = props.setMessage;

    const getImage = async (imageName) => {
        try {
            if (!imageName)
                return false;
            let imageMap = shareContext.state.imageMap;
            if (imageMap && imageMap.has(imageName)) {
                setImage2(imageMap.get(imageName))
                return true;
            }
            const promise1 = access.doDownload(restaurantId, imageName)
            Promise.resolve(promise1)
                .then((res) => {
                    if (!imageMap)
                        imageMap = new Map();
                    imageMap.set(imageName, res.data);
                    shareContext.dispatch({
                        type: "setImageMap",
                        value: imageMap
                    });
                    setImage2(res.data)
                    return true;
                })
                .catch((error) => console.log("Error"));
        } catch (err) {
            console.log("error:" + err.error);
        }
    };
}

export default imgutil;