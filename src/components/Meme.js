import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
class Loading extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading'
    };
  }
  
  function MemeList(){

  }
}


class Meme extends Component{
  constructor(props){

    super(props);
    this.state={
      memes:[],
      loading: true,
    }
  }


  render(){
    return(
      <div style={{textAlign:'center'}}>
        <h1>Meme Master</h1>
        <table>
          <form>
            <tr>
              <td>
                <div id='canvas' style={{height:'400px';width:'400px'}}></div>
              </td>
              <td style={{border:'1px solid #000000'}}>
                <h4 className="help-block" id="clock"></h4>
                <input type="file" id="file-input" accept="images/*"/>
                <section>
                  <h3>Title</h3>
                  <input type="text" id='title' required/>
                </section>
                <section>
                  <h3>Top Text:</h3>
                  <input type='text' id='topText' />
                  <input type='number' id='topFont' placeholder='Font Size' min='0' max='100' value='50' style={{width:'7vw'}}/>
                </section>
                <section>
                  <h3>Bottom Text:</h3>
                  <input type='text' id='botText' />
                  <input type='number' id='botFont' placeholder='Font Size' min='0' max='100' value='50' style={{width:'7vw'}}/>
                </section>
                <hr>
                <Button id='txtBtn' >Change Text</Button><br>
                <Button bsStyle='success' id='meme'>Generate Meme</Button>
                <input type="hidden" id='original' />
              </td>
          </form>
        </table>
      </div>
      <div id="list">
      </div>
    )
  }
}

export default Meme
