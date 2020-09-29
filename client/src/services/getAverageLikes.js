export const getAverageLikes = (likesLength, dislikesLength) => {
    console.log(likesLength , dislikesLength)
    let pourcentage = (likesLength * 100) / (likesLength + dislikesLength);
    return pourcentage.toFixed(0)
}