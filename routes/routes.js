module.exports = function (express, tasks) {
    var router = express.Router();
    router.route('/') // Redirection sur la partie Front
            .get(function(req, res) {
                res.sendfile('/public/index.html', { root: __dirname + '/..' })
            });

    router.route('/tasks') // Implantation des méthodes GET, PUT, UPDATE et DELETE
        .get(function(req,res) {
            tasks.find(function(err, resTask){
                if (err){
                    res.status(403);
                    res.send(err);
                } else {
                    res.status(200);
                    res.json(resTask);
                }
            });
        })
        .post(function(req,res) {
            var newTask = new tasks();
            newTask.title = req.body.title;
            newTask.description = req.body.description;
            newTask.category = req.body.category;
            newTask.date = req.body.date;
            newTask.time = req.body.time;
            newTask.save(function(err) {
                if(err) {
                    res.status(403);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json({message: 'Tâche ajoutéé.'});
                }
            });
        });

    router.route('/tasks/:task_id')
        .get(function(req,res) {
            tasks.findById(req.params.task_id, function(err, resTask) {
                if (err) {
                    res.status(403);
                    res.send(err);
                } else {
                    res.status(200);
                    res.json(resTask);
                }
            });
        })
        .put(function(req,res) {
            tasks.findById(req.params.task_id, function(err, resTask) {
                if (err) {
                    res.status(403);
                    res.send(err);
                } else {
                    resTask.title = req.body.title;
                    resTask.description = req.body.description;
                    resTask.category = req.body.category;
                    resTask.date = req.body.date;
                    resTask.time = req.body.time;
                    resTask.save(function (err) {
                        if (err) {
                            res.status(403);
                            res.send(err);
                        } else {
                            res.status(200);
                            res.json({message: 'Tâche mise à jour.'});
                        }
                    });
                }
            });
        })
        .delete(function(req,res) {
            tasks.remove({_id: req.params.task_id}, function(err, resTask) {
                if (err){
                    res.status(403);
                    res.send(err);
                } else {
                    res.status(200);
                    res.json({message:"Tâche supprimée."});
                }
            });
        });
        return router;
};