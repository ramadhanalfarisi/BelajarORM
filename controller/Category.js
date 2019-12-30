const CategoryService = require('../service/CategoryService')
const Response = require('../helper/response')
const { validationResult } = require('express-validator')

exports.createCategory = async function (req,res) {
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

exports.readCategory = async function (req,res) {

    let categoryService = new CategoryService()

    let data = await categoryService.readCategory(req,res)
    let dataCategory = data.category.rows
    let pagination = data.paginationRes
    let response = new Response(res)
    return response.success(dataCategory,[{
        value: '',
        msg: 'success read category',
        param: ''
    }],200,pagination)
}

exports.updateCategory = async function (req,res) {

    const error = validationResult(req)
    if (!error.isEmpty()){
        let response = new Response(res)
        return response.failed(
            error.array(),
            422
        )
    }

    let categoryService = new CategoryService()

    let data = await categoryService.updateCategory({
        name: req.body.name,
        slug: req.body.slug
    },req.params.id)

    let response = new Response(res)
    return response.success(data,[{
        value: '',
        msg: 'success update category',
        param: ''
    }])
}

exports.deleteCategory = async function (req,res) {

    let categoryService = new CategoryService()

    let data = await categoryService.deleteCategory(req.params.id)

    let response = new Response(res)
    return response.success(data,[{
        value: '',
        msg: 'success delete category',
        param: ''
    }])
}