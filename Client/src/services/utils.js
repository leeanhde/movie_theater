export const truncateComment = (comment, maxLength = 20) => {
    if (comment.length <= maxLength) {
        return comment;
    }
    return `${comment.slice(0, maxLength)}...`;
};
