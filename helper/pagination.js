module.exports = {

    makePagination: function (limit, originalUrl, total, page, category) {
      let rows = category.rows
  
      let incrementPage = parseInt(page) + 1
      let decrementPage = parseInt(page) - 1
      let nextUrl = ''
  
      if (originalUrl.search(/page=/) <= 0) {
        nextUrl = originalUrl + '&page=2'
      } else {
        nextUrl = originalUrl.replace(/(page=)[^\&?]+/g, '$1' + (incrementPage))
      }
      let prevUrl = originalUrl.replace(/(page=)[^\&?]+/g, '$1' + (decrementPage))
  
      if (decrementPage <= 0) {
        prevUrl = null
      }
      if (incrementPage > Math.ceil(category.count / limit)) {
        nextUrl = null
      }
  
      return {
        total: total,
        per_page: category.rows.length,
        current_page: parseInt(page),
        last_page: Math.ceil(category.count / limit),
        next_page_url: total / limit > 0 || total / limit !== parseInt(page) ? nextUrl : null,
        prev_page_url: prevUrl,
        from: category.rows[0].id,
        to: category.rows[rows.length - 1].id
  
      }
    }
  
  }