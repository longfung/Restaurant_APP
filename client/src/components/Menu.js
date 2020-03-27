import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import NavTab from './NavTab';
// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {Form, Input, Row, Col, Button, FormGroup, Label, Card, CardImg} from 'reactstrap';
function Menu(props) {
    // debugger;
    const restaurantId = props.restaurant_id;
    
    const [menu, setMenu] = useState ({
        id: '',
        name: '',
        price: 0,
        rest_id: 1000,
        category_id: '',
        image_path: ''
    })
    const [menuList, setMenuList] = useState([]);
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('Choose Image');
    const [categoryList, setCategoryList] = useState([
        // id: '',
        // label: ''
    ])

    const cOptions = [
        {id: 10, label: "Beef"} ,
        {id: 20, label: "soup"}
    ];

    const [category, setCategory] = useState(
        { 
          id: 10, 
          label: "beef"
        }
    );

    useEffect( () => {
        // const restaurantId = 45000
        console.log("in UseEffect");
        getMenuList();
        axios.get('/api/category', {params: {restaurant_id: restaurantId}})
        .then (res =>{
            res.data.map(item => ( 
                setCategoryList(prevState => ([...prevState, {id: item.id, label: item.category_name}]))
            ))
        })
        .catch( error => console.log(error));
    }, []);

    const handleSelector = e => {
        e.preventDefault();
        if (e.target.files.length == 0)
            return;
        var image = e.target.files[0];
        setImage(image)
        setImageName(image.name)   

        var formdata = new FormData();
        formdata.append('file', image);

        // axios.post('/fileupload', formdata, {
        //     // headers: {'Content-Type': 'multipart/form-data' }
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // } )
        //        .then(res => {
       
        // axios.post('/fileupload', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
        // .then (res => {
        //     menu.image_path = res.data.filename; })
        //     // setMenu(...menu, {image_path: res.data.filepath})})
        // .catch(err => {
        //     console.log("Error in file upload")});   

        // use Festch
        // fetch('/fileupload', {
        //     method: 'post',
        //     // headers: { 'Content-Type': 'multipart/form-data' },
        //     body: formdata,
        //   })
        //   .then(res => {
        //         // menu.image_path = res.data.filename;
        //         menu.image_path = process.cwd() + 'server/images/img4.jpg';
        //     // setMenu({...menu, image_path: res.data.filepath})
        //         // handleCreateOrUpdateMenu()
        //     })
        //  .catch( error => {
        //      console.log(error)}) 
           


    };

    const getMenuList = () =>  {
        axios.get('/api/Menu', {params:{restaurant_id: restaurantId}})
        .then(res => { 
           console.log(res)
           setMenuList(res.data) 
        })
        .catch( error => console.log("Error")) 
      };

    const handlePostMenu = () => {
        if (image) {
            var formdata = new FormData();
            formdata.append('file', image);
            axios.post('/fileupload', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                // debugger;
                menu.image_path = res.data.filename;
                // setMenu({...menu, image_path: res.data.filepath})
                handleCreateOrUpdateMenu()})
                // console.log(res);})
            .catch(err => {
                debugger;
                console.log("Error in file upload")});
        } else { 
            // debugger;
            handleCreateOrUpdateMenu();
        }      
    }

    const handleCreateOrUpdateMenu = () => {
        if (menu.id != '') {
            postUpdateMenu();
        } else {
            postCreateMenu();
        };                   
        getMenuList();  
        initialMenu();
    };

    const postCreateMenu = () => {
        debugger;
        let data = JSON.stringify({ name: menu.name, price: menu.price, image_path: menu.image_path, restaurant_id: restaurantId, category_id: category.id });
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

    const postUpdateMenu = () => { 
        // debugger;
        let data = JSON.stringify({ 
            id: menu.id,
            name: menu.name, 
            price: menu.price, 
            image_path: menu.image_path, 
            category_id: category.id });
          
        axios.put('/api/menu', data, {
                headers: { 'Content-Type': 'application/json' }
            } )
        .then(res => {
          // console.log(res.data.json());
            // getMenuList();
        //   setNode({ ...node, id: '', category_name: '', category_description: '', restaurant_id: restaurantId });          
            // initialMenu();
       });
    };
  
    
    const setEdit = (obj) => {
        for (var i = 0; i < categoryList.length; i++) {
            if (obj.category_id == categoryList[i].id) {
                setCategory({
                    id: categoryList[i].id,
                    label: categoryList[i].label
                })             
                break;
            }
        }
        setMenu({
            id: obj.id,
            name: obj.name,
            price: obj.price,
            rest_id: obj.restaurant_id,
            category_id: obj.category_id,
            image_path: obj.image_path           
        });
    }

    const setDelete = (obj) => {
      axios.delete('/api/menu', {params:{id: obj.id}})
        .then(res => {
          // console.log(res.data.json());
            getMenuList();
        //   setMenu({ ...menu, name: '', price: 0, category_id: '', path: res.data.filepath });         
            initialMenu();
        })

      .catch( err => console.log(err.error))        
    }

    const handleSelect= (e) => {
        debugger;
        console.log(e.target.value);
        console.log(menu.category_id);
    }

    const initialMenu = () => {
        setMenu({ ...menu, 
            id: '', 
            name: '', 
            price: 0, 
            path: '',
            category_id: ''
        })
        setCategory({
            id :'',
            label: ''
        })
    }

    return (
        <div>
            <NavTab {...props}/>
            <Form>
                <Row form>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="name">Dish Name</Label>
                            <Input type='text' 
                                value={menu.name} 
                                id="name"
                                onChange={e => setMenu({...menu, name: e.target.value})}/>                       </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="text"
                            id="price"
                            value={menu.price}
                            onChange={e => setMenu({...menu, price: e.target.value})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6">
                        <FormGroup>
                        <Label for="categoryid">category</Label>
                        <Select 
                            id = "categoryid"
                            options = {categoryList}
                            onChange = {setCategory}
                            className = 'mb-3'
                            placeholder = "Select a category"
                            value = {category}
                        />
                        </FormGroup> 
                    </Col>
                    <Col xs="3" sm="3">
                        <FormGroup>
                        <Label for="pathId">Upload Picture</Label>    
                        <Input type='file' id = "pathId" onChange={handleSelector} />                       
                        </FormGroup>
                    </Col>
                    <Col xs="3" sm="3">
                        
                        <Card className='width: 6rem'>
                            <CardImg top width="100%" src={menu.image_path}/>
                        </Card>
                        </Col>
    
                </Row>       
                <Row>

                    <Col xs="6" sm="6">
                        <Button onClick={handlePostMenu}> Create menu </Button>   
                    </Col>



                    </Row>                    
            </Form>
            <hr></hr>
            <div>
                <h2>Menu List</h2>
                <ul> 
                    {menuList.map((item, idx) => (
                    <Row key={idx}> 
                        <Col sm={4}>
                        {item.name}
                        </Col>
                        <Col sm={4}>
                        {item.price}
                        </Col>
                        <Col sm={2}>
                        {item.category_id}
                        </Col>
                        <Col sm={1}>
                        <Button onClick={() => setEdit(item)}>Edit</Button>
                        </Col>
                        <Col sm={1}>
                        <Button onClick={() => setDelete(item)}>Delete</Button>
                        </Col>

                    </Row>
                    ))}
                </ul>
            </div>           
        </div>
    );
}

export default Menu;