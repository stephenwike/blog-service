var _author = {}

module.exports = {
    NewAuthor: (author) => {
        if (!author) {
            return { Name : "" }
        }
        if (!author.Name) {
            return { Name : author.Name }
        }
        return null;
    },
    NewPost: () => {},

}