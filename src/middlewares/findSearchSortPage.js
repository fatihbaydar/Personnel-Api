"use strict"
 
// app.use(findSearchSortPage):

module.exports = (req, res, next) => {  
// ARAMA & SIRALAMA & SAYFALAMA:  

    // ARAMA: URL?search[key1]=value1&search[key2]=value2
    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    // Cancelled -> SIRALAMA: URL?sort[key1]=1&sort[key2]=-1 (1:ASC, -1:DESC)
    // mongoose=^8.0 -> SIRALAMA: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
    const sort = req.query?.sort || {}

    // SAYFALAMA: URL?page=1&limit=10
    // LIMIT:
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
    // SAYFA:
    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1
    // ATLA:
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    // Model için Arama Sıralama Sayfalama motorunun çalıştırılması:
    res.getModelList = async function (Model, filter = {}, populate = null) {
        const filterAndSearch = {...filter,...search}
 
        return await Model.find(filterAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    // Ayrıntılar:
    res.getModelListDetails = async function (Model, filter={}) {
        const filterAndSearch = {...filter,...search}
        const data = await Model.find(filterAndSearch)
        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}