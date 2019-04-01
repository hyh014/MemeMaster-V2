import React, { Component} from 'react';
import {Button, Form, FormGroup, Label} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Meme.css';



class Meme extends Component{
  constructor(props){

    super(props);
    this.state={

      currentImagebase64:'',
      topText:'',
      botText:'',
      fontSize:'50',
      topDraggable:false,
      botDraggable:false,

      topX: "50%",
      topY: "10%",

      botX: '50%',
      botY: '90%',



    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }

  handleFile(file){
    if (file[0].type.match(/^image\//)) {
      let imageObj = new Image();
      let canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      let ctx = canvas.getContext('2d');
      let svg = document.getElementById('svg');
      imageObj.onload = function(){

        ctx.drawImage(imageObj,0,0, imageObj.width, imageObj.height,
                      0,0, canvas.width,canvas.height);
        sessionStorage.setItem('URL',canvas.toDataURL("image/png"));


      }
      imageObj.src = URL.createObjectURL(file[0]);

      this.setState({
        currentImagebase64: sessionStorage.getItem('URL'),
      });
    }

  }
  handleSubmit(event){
    event.preventDefault();
  }
  changeText(e){
    this.setState({
      [e.currentTarget.name]:e.currentTarget.value
    });
  }
  getStateObj(e,type){

    let rect = this.imageRef.getBoundingClientRect();

    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;

    let stateObj = {};

    if(type==='bottom'){

      stateObj = {
        botDraggable: true,
        topDraggable: false,
        botX: `${xOffset}px`,
        botY: `${yOffset}px`
      }
    }else if(type==='top'){
      stateObj = {
        botDraggable: false,
        topDraggable: true,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }

    return stateObj;
  }
  handleMouseDown(e,type){
    const stateObj = this.getStateObj(e, type);

    document.addEventListener('mousemove',(e) => this.handleMouseMove(e,type));
    this.setState({
      ...stateObj
    });

  }
  handleMouseMove(e,type){

    if(this.state.topDraggable || this.state.botDraggable){

      let stateObj = {};
      if(type === 'bottom' && this.state.botDraggable){
        stateObj = this.getStateObj(e,type);

      }else if(type === 'top' && this.state.topDraggable){
        stateObj = this.getStateObj(e,type);

      }
      this.setState({
        ...stateObj
      });
    }
  }
  handleMouseUp(e){
    document.removeEventListener('mousemove',this.handleMouseMove);
    this.setState({
      topDraggable:false,
      botDraggable:false
    })
  }
  render(){
    return(
      <div style={{textAlign:'center'}}>
        <h1>Meme Master</h1>
        <table>
        <tbody>
          <tr>
            <td style={{border:'1px solid #000000'}}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={400}
            height={400}
            id="svg">
              <image ref={el => {this.imageRef = el }} xlinkHref={this.state.currentImagebase64} width={400} height={400}/>
              <text
              x={this.state.topX} y={this.state.topY}
              dominantBaseline='middle'
              textAnchor='middle'
              className='meme-text'
              style={{fontSize:this.state.fontSize, zIndex: this.state.isTopDragging ? 4 : 1 }}
              onMouseDown={(e) => this.handleMouseDown(e,'top')}
              onMouseUp={(e) => this.handleMouseUp(e,'top')}>
                {this.state.topText}
              </text>
              <text x={this.state.botX} y={this.state.botY}
              dominantBaseline='middle'
              textAnchor='middle'
              className='meme-text'
              style={{fontSize:this.state.fontSize}}
              onMouseDown={(e) => this.handleMouseDown(e,'bottom')}
              onMouseUp={(e) => this.handleMouseUp(e,'bottom')}>
                {this.state.botText}
              </text>
            </svg>
            </td>
            <td style={{border:'1px solid #000000'}}>
              <h4 className="help-block" id="clock"> </h4>
              <input type="file" id="file-input" accept="images/*" onChange={(e) => {this.handleFile(e.target.files)}}/>
              <Form>
                <FormGroup>
                  <Label for="topText">Top Text:</Label>
                  <input className="form-control" type='text' name='topText' id='topText' placeholder="Add Text" onChange={this.changeText}/>
                </FormGroup>
                <FormGroup>
                  <Label for='botText'>Bottom Text:</Label>
                  <input className="form-control" type='text' name='botText' id='botText' placeholder="Add Text" onChange={this.changeText}/>
                </FormGroup>
                <FormGroup>
                  <Label for="fontSize">Font Size:</Label>
                  <input type='number' name="fontSize" placeholder='Font Size' min='1' max='100' defaultValue='50' onChange={this.changeText} />
                </FormGroup>
                <hr/>
                <Button bsStyle='success' id='meme'>Generate Meme</Button>
              </Form>
             </td>
           </tr>
         </tbody>
        </table>
      </div>
    )
  }
}

export default Meme
