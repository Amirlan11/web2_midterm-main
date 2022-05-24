const menuModel = require('../models/menuModel')

class menuController {
    async addFilm(req, res) {
        try {
            const film = new menuModel({
                title: req.body.filmTitle,
                img: req.body.filmImg
            })
            await film.save()
            res.redirect('/admin')
        } catch (e) {
            console.log(e)
        }
    }
    async deleteFilm(req,res){
        try{
            const filmTitle = req.body.filmDel
            const film = await menuModel.findOneAndDelete({title:filmTitle})
            res.redirect('/admin')
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = new menuController()