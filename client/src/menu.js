import React, {useState} from 'react';   
import axios from 'axios';

function Menu(props) {
    const rest_id = props.id;
    const [menu, setMenu] = useState ({
        name: "",
        price: 0,
        rest_id: 1000,
        path: "",
        bImage: false
    })
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('Choose Image');

    const handleSelector = e => {
        if (e.target.files.length == 0)
            return;
        var image = e.target.files[0];
        setImage(image)
        setImageName(image.name)
    }

    const postMenuData = () => {
        let data = JSON.stringify({ name: menu.name, price: menu.price, path: menu.path });
        axios.post('/api/menu', data, {
            // headers: {'Content-Type': 'multipart/form-data' }
            headers: { 'Content-Type': 'application/json' }
        } )
               .then(res => {
                // debugger;
                // console.log(res.data);  
                // invokeFetch();
                // setMenu({ ...menu, name: '', price: 0, path: '' });
                  
              });               
    }
    const handlePostMenu = () => {
        var formdata = new FormData();
        if (image) {
            formdata.append('file', image);
        
        // formdata.append('body', JSON.stringify({ name: menu.name, price: menu.price, path: menu.path }));
            axios.post('/fileupload', formdata, {
                headers: {'Content-Type': 'multipart/form-data' }
                // headers: { 'Content-Type': 'application/json' }
            })
        // debugger;
        // fetch('/api/menu', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name: menu.name, price: menu.price, path: menu.path })
        //   })
          // .then(res => res.json())
            
          .then(res => {
            // debugger;
            // console.log(res.data.filepath);
            menu.path = res.data.filepath;
            // debugger;
            postMenuData();
            // invokeFetch();
            setMenu({ ...menu, name: '', price: 0, path: res.data.filepath });
              
          })
        } else { 
            postMenuData();
            // invokeFetch();
            setMenu({ ...menu, name: '', price: 0, path: '' });
        }      
    }
    
    return (
        <div>
            <forn>
                <input type='text' 
                    value={menu.name} 
                    onChange={e => setMenu({...menu, name: e.target.value})}/>
                <input type="text"
                    value={menu.price}
                    onChange={e => setMenu({...menu, price: e.target.value})}/>
                <input type="text"
                    value={menu.path}
                    onChange={e => setMenu({...menu, path: e.target.value})}/>
                <input type='file' onChange={handleSelector} />
                <button onClick={handlePostMenu}> Create menu </button>
                {/* <label>{imageName}</label> */}
                    
          

            </forn>
            
        </div>
    );
}

export default Menu;