const express = require("express");
const  router = express.Router();
const  db = require("../database/db");

router.post("/new", (req,res) => {
    var video = req.body.video;
    var pdf = req.body.pdf;
        db.formation.findOne({
            where: {nom: req.body.nom}
        })
        .then(formation => {
            if(!formation){
                db.formation.create({
                    nom: req.body.nom,
                    description: req.body.description,
                    duree: req.body.duree,
                    Status: req.body.Status
                })
                .then(formationitem => {
                    db.image.create({
                        Image: req.body.image,
                        formationId: formationitem.id
                    })
                    .then(() => {
                        db.video.create({
                            video: video,
                            formationId: formationitem.id
                        })
                        .then(()=>{
                            db.pdf.create({
                                Pdf: pdf,
                                formationId: formationitem.id
                            })
                            .then(() => {
                                db.formation.findOne({
                                    where: {id: formationitem.id},
                                    include: [{
                                        model: db.image
                                    },
                                    {
                                        model: db.video
                                    },
                                    {
                                        model: db.pdf
                                    }],
                                })
                                .then(reponse => {
                                    res.status(200).json({formation: reponse})
                                })
                                .catch(err => {
                                    res.json({
                                        error: err
                                    })
                                })
                            })
                            .catch(err => {
                                res.json({
                                    error: err
                                })
                            })
                        })
                        .catch(err => {
                            res.json({
                                error: err
                            })
                        })

                    })
                    .catch(err => {
                        res.json({
                            error: err
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        error: err
                    })
                })
            }
            else{
                res.json('la formation est déja dans la base ');
            }
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
});

router.get("/all", (req, res) => {
    db.formation.findAll({
        include: [
            {
                model: db.image,
            },
            {
                model: db.pdf,
            },
            {
                model: db.video,
            },
        ],
    })
    .then(formation => {
        res.status(200).json({formation: formation})
    })
    .catch(err => {
        res.json(err);
    })
});

router.put("/update/:id", (req, res) => {
    db.formation.findOne({
        where: {id: req.params.id}
    })
    .then(formation => {
        formation.update(req, body)
        .then(formationitem => {
            res.status(200).json(formationitem);
        })
        .catch(err => {
            res.json(err);
        })
    })
});

router.post("/addVideo", (req, res) => {
    db.video.create({
        video: req.body.video,
        formationId: req.body.id
    })
    
    .then(video => {
        
        db.formation.findOne({
            where: {id: req.body.id},
            include: [
                {
                    model: db.image,
                },
                {
                    model: db.pdf,
                },
                {
                    model: db.video,
                },
            ],
        })
        .then(formation => {
            res.status(200).json({formation: formation})
        })
        .catch(err => {
            res.json(err);
        })
    })
    .catch(err => {
        res.json(err);
    })
})

router.get("/getById/:id", (req, res) => {
    db.formation.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: db.image,
            },
            {
                model: db.pdf,
            },
            {
                model: db.video,
            },
        ],
    })
    .then(formation => {
        res.status(200).json({ formation: formation })
    })
    .catch(err => {
        res.json(err);
    });
})

module.exports = router;