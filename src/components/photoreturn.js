import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

export default class PhotoReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    }
  }

  componentWillMount() {
    // Request for images tagged xmas       
    axios.get('https://res.cloudinary.com/whistle-construction/image/list/drywall.json')
      .then(res => {
        console.log(res.data.resources);
        this.setState({gallery: res.data.resources});
      });
  }
  uploadWidget() {
      // . . .
  }
  render(){
    return (
      <div className="main">
        <CloudinaryContext cloudName="whistle-construction">
          {
            this.state.gallery.map(data => {
              return (
                <div className="responsive" key={data.public_id}>
                  <div className="img">
                    <a target="_blank" href={`https://res.cloudinary.com/whistle-construction/image/upload/${data.public_id}.jpg`}>
                      <Image publicId={data.public_id}>
                        <Transformation
                          crop="scale"
                          width="200"
                          height="200"
                          dpr="auto"
                          responsive_placeholder="blank"
                        />
                      </Image>
                    </a>
                    <div className="desc">Created at {data.created_at}</div>
                  </div>
                </div>
              )
            })
          }
        </CloudinaryContext>
      </div>

    );
  }
}