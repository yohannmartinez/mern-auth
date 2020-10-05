import { updateSpot } from "./spot"
import { updateUser } from "./user"
import { createNotification } from "./notifications"

export const likeOrDislikeSpot = async (likeStatus, spotTargeted, userTargeted) => {
    let user = userTargeted;
    let spot = spotTargeted;
    let notification = {
        targeted_user_id: spot.added_by,
        transmitter_user_id: user._id,
        attachment: {
            spot_id : spot._id,
            spot_name: spot.name,
        },
        libelle: "like/dislike",
        content: `ainsi que ${spot.liked_by.length + spot.disliked_by.length} personnes ont like/dislike votre spot`,
    };
    if (likeStatus === "like" && !user.liked_spots.includes(spot._id)) {
        // add like and remove dislike if exist
        let remove_dislike_spot = spot.disliked_by.filter(dislike => dislike !== user._id);
        spot.liked_by.push(user._id)
        let remove_dislike_user = user.disliked_spots.filter(dislike => dislike !== spot._id)
        user.liked_spots.push(spot._id)
        let spotResponse = await updateSpot({"disliked_by" : remove_dislike_spot, "liked_by" : spot.liked_by }, spot._id);
        let userResponse = await updateUser({"disliked_spots" : remove_dislike_user, "liked_spots" : user.liked_spots }, user._id);
        spot = spotResponse.data.spot;
        user = userResponse.data.user;
    } else if (likeStatus === "like" && user.liked_spots.includes(spot._id)) {
        // remove like
        let remove_like_spot = spot.liked_by.filter(like => like !== user._id);
        let remove_like_user = user.liked_spots.filter(like => like !== spot._id)
        let spotResponse = await updateSpot({ "liked_by": remove_like_spot }, spot._id);
        let userResponse = await updateUser({ "liked_spots": remove_like_user }, user._id);
        spot = spotResponse.data.spot;
        user = userResponse.data.user;

    } else if (likeStatus === "dislike" && !user.disliked_spots.includes(spot._id)) {
        // add dislike and remove like if exist
        let remove_like_spot = spot.liked_by.filter(like => like !== user._id);
        spot.disliked_by.push(user._id)
        let remove_like_user = user.liked_spots.filter(like => like !== spot._id)
        user.disliked_spots.push(spot._id)
        let spotResponse = await updateSpot({ "disliked_by": spot.disliked_by , "liked_by": remove_like_spot }, spot._id);
        let userResponse = await updateUser({ "disliked_spots": user.disliked_spots, "liked_spots": remove_like_user }, user._id);
        spot = spotResponse.data.spot;
        user = userResponse.data.user;
    } else if (likeStatus === "dislike" && user.disliked_spots.includes(spot._id)) {
        // remove dislike
        let remove_dislike_spot = spot.disliked_by.filter(dislike => dislike !== user._id);
        let remove_dislike_user = user.disliked_spots.filter(dislike => dislike !== spot._id)
        let spotResponse = await updateSpot({ "disliked_by": remove_dislike_spot }, spot._id);
        let userResponse = await updateUser({ "disliked_spots": remove_dislike_user }, user._id);
        spot = spotResponse.data.spot;
        user = userResponse.data.user;
    }

    let notificationResponse = await createNotification(notification);

    return { spot: spot, user: user }
}