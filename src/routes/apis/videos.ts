import { getAll, setVideo } from './../../services/redis';
import { Request, Response } from "express";
import { Video } from "../../models/video";

export class Videos {
  videos: Video[] = [];

  public routes(app): void {
    app.route('/')
      .get((req, res, next) => {
      res.json({ message: 'Welcome to Video repository' });
    });

    app.route('/api/videos')
      .get((req: Request, res: Response) => {
        getAll().then((list) => {
          if (list) {
            let json = JSON.parse(list);
            res.status(200).send(json);
          } else {
            res.status(404)
              .send({
                message: 'No videos found.',
                status: res.status
              });
          }
        });
      });

    app.route('/api/videos/:id')
      .get((req: Request, res: Response) => {
        let id = parseInt(req.params.id);
        getAll().then((list) => {
          if (list) {
            let json = JSON.parse(list);
            let video = json.find(item => item.id === id);
            if (video) {
              res.status(200).send({
                  message: 'Success',
                  status: res.status,
                  video
                });
            } else {
              res.status(404).send({
                  message: 'No video found with the id.',
                  status: res.status
                });
              }
          } else {
            res.status(404).send({
                message: 'No videos found.',
                status: res.status
            });
          }
        }).catch(err => console.log(err));
    });

    app.route('/api/videos')
      .post((req: Request, res: Response) => {
        let videoLst = req.body;
        setVideo(videoLst).then(resp => {
          res.status(200).send({
            message: 'Success',
            status: res.status
          });
        });
      });
  }
}