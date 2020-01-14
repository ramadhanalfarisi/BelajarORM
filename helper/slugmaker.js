const slugify = require('slugify')

module.exports = {
    makeSlug : (text) => {
        const slug = slugify(text, {
            replacement: '-',
            remove: null,
            lower: true,
        })
        return slug
    }
}