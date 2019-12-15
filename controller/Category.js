const CategoryService = require('../service/CategoryService')
const Response = require('../helper/response')
const { validationResult } = require('express-validator')

exports.createCategory = async (req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
        let response = new Response(res)
        return response.failed(
            error.array(),
            422
        )
    }

    let categoryService = new CategoryService()

    let data = await categoryService.createCategory({
        name: req.body.name,
        slug: req.body.slug
    })

    let response = new Response(res)
    return response.success({
        id: data.id,
        name: data.name,
        slug: data.slug
    },[{
        value: '',
        msg: 'success create new category',
        param: ''
    }])
}