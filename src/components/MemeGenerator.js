import React, {Component} from 'react'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg",
            allMemeImages:[]
        }

        this.handleChange=this.handleChange.bind(this)
        this.randomImg=this.randomImg.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response=>response.json())
            .then(response=>{
                const{memes}=response.data
                this.setState({allMemeImages:memes})
            })
    }

    handleChange(event){
        const {name, value}=event.target
        this.setState({
            [name]:value
        })
    }

    randomImg(event){
        event.preventDefault()
        let randNum=Math.round(Math.random()*this.state.allMemeImages.length);
        const randMemeImg=this.state.allMemeImages[randNum].url
        this.setState({
            randomImage:randMemeImg
        })
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.randomImg}>
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        placeholder="Top Text" 
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        placeholder="Bottom Text" 
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator