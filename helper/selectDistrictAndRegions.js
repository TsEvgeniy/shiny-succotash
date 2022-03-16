const { 
    andijondistrict,
    buxorodistrict,
    jizzax,
    kashkadario,
    regionIds,
    districtsNavoi,
    districtsNamangan,
    districtsSamarqand,
    districtsSirdaryo,
    districtsToshkentViloyati,
    districtFergana,
    districtKarakalpakstan,
    districtTashkent,
    districtXorezm,
    districtsSurhand
} = require('../helper/UzbDistricts');
const districts = [
    ...andijondistrict,
    ...buxorodistrict,
    ...jizzax,
    ...kashkadario,
    ...districtsNavoi,
    ...districtsNamangan,
    ...districtsSamarqand,
    ...districtsSirdaryo,
    ...districtsToshkentViloyati,
    ...districtFergana,
    ...districtKarakalpakstan,
    ...districtTashkent,
    ...districtXorezm,
    ...districtsSurhand
]

const getCodeRegion = codeNits => {
    let codeChina = undefined
    regionIds.map(item => {
        item.code === codeNits && (codeChina = item.cityCountyId)
    })
    return codeChina
}

const getCodeDistrict = codeNits => {
    let codeChina = undefined
    districts.map(item => {
        item.code === codeNits && (codeChina = item.cityCountyId)
    })
    return codeChina
}
module.exports = {
    getCodeRegion,
    getCodeDistrict
}