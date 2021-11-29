import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { createPost, updatePost } from '../actions/posts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from 'bootstrap'

const Form = ({ currentId, setCurrentId }) => {
    const modalRef = useRef();
    const posts = useSelector((state) => state.posts);
    const [formErrors, setFormErrors] = useState({});
    const [openP, setOpenP] = useState({disabled:true});
    const [findProspects, setFindProspects] = useState([]);
    const [openC, setOpenC] = useState({disabled:false});
    const [openPOther, setOpenPOther] = useState({show:false});
    const [openCOther, setOpenCOther] = useState({show:false});
    const [postData, setPostData] = useState({ first_name: '', last_name: '', company: '', email: '', mobile: '', products: [], contact_after:'', contact_mode:[], agent_comment:'', segment:'', comments:'', date:'', other_service:'', other_mode:'', tags:[] });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) { setPostData({_id:post._id, first_name: post.first_name, last_name: post.last_name, company: post.company, segment:post.segment, email: '', mobile: '', products: [], contact_after:'', contact_mode:[], agent_comment:'', comments:'', date:'', other_service:'', other_mode:'', tags:[]}); }
      }, [post]);
    
    const clear = () => {
        setCurrentId(0);
        setOpenP({disabled:true});
        setOpenC({disabled:false});
        document.getElementById('createForm').reset();
        setPostData({ first_name: '', last_name: '', company: '', email: '', mobile: '', products: [], contact_after:'', contact_mode:[], agent_comment:'', segment:'', comments:'', date:'', other_service:'', other_mode:'', tags:[] });
    };

    const onChangeContactMode = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setPostData({ ...postData, contact_mode: postData.contact_mode.concat(e.target.value) })
            if(e.target.value === 'Other') {
                setOpenCOther({show:true})
            }
        } else {
            setPostData({ ...postData, contact_mode: postData.contact_mode.filter(val => val !== e.target.value )});
            if(e.target.value === 'Other') {
                setOpenCOther({show:false})
            }
        }
    };

    const onChangeProduct = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setPostData({ ...postData, products: postData.products.concat(e.target.value) });
            if(e.target.value === 'Other') {
                setOpenPOther({show:true})
            }
        } else {
            setPostData({ ...postData, products: postData.products.filter(val => val !== e.target.value )});
            if(e.target.value === 'Other') {
                setOpenPOther({show:false})
            }
        }
    };

    const setTag = (val) => {
        if(postData.tags.includes(val)) {
            setPostData({ ...postData, tags: postData.tags.filter(item => item !== val )});
        } else {
            setPostData({ ...postData, tags: postData.tags.concat(val) });
        }
    };

    const enableAgent = async (e) => {
        let fcheck  = Object.keys(formErrors);
        if(fcheck.length === 0) {
            setOpenP({disabled:false});
            setOpenC({disabled:true});
        }
    };

    const handleChange = (e) => {
        const { name } = e.target;
        
        switch (name) {
            case 'first_name':
                setPostData({ ...postData, first_name: e.target.value }); 
                if(e.target.value.length <= 1) {
                    setFormErrors({...formErrors, first_name:'First Name length must be more than 2'})
                } else {
                    delete(formErrors.first_name); 
                   let checkpost = posts.filter(item => item.first_name === e.target.value);
                   if(checkpost.length >= 1) {
                        setFindProspects(checkpost);
                        showModal()
                       //setCurrentId(checkpost[0]._id)
                   }

                }
                break;
            case 'last_name':
                setPostData({ ...postData, last_name: e.target.value }); 
                if(e.target.value.length <= 1) {
                    setFormErrors({...formErrors, last_name:'Last Name length must be more than 2'})
                } else {
                    delete(formErrors.last_name); 
                }
                break;
            case 'company':
                setPostData({ ...postData, company: e.target.value }); 
                if(e.target.value.length <= 3) {
                    setFormErrors({...formErrors, company:'Company length must be more than 3'})
                } else {
                    delete(formErrors.company); 
                }
                break;
            case 'email':
                setPostData({ ...postData, email: e.target.value }); 
                if(validEmail(e.target.value)) {
                    setFormErrors({...formErrors, email:'Email is not valid'})
                } else {
                    delete(formErrors.email); 
                }
                break;
            case 'mobile':
                setPostData({ ...postData, mobile: e.target.value }); 
                break;
            case 'segment':
                setPostData({ ...postData, segment: e.target.value }); 
                if(postData.segment === '') {
                    setFormErrors({...formErrors, segment:'Segment is not valid'})
                } else {
                    delete(formErrors.segment); 
                }
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost(postData));
            setOpenP({disabled:true});
            setOpenC({disabled:false});
            Swal.fire({
                title: 'Great!',
                text: 'Your details has been saved successfully!!',
                icon: 'success',
                timer: 2000,
                showConfirmButton:false,
                timerProgressBar: true,
            });
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            Swal.fire({
                title: 'Great!',
                text: 'Details has been updated successfully!!',
                icon: 'success',
                timer: 3000,
                showConfirmButton:false,
                timerProgressBar: true,
            });
            clear();
        }
    };

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    };

        
    const hideModal = (val) => {
        if(val !== 0) {
            setCurrentId(val._id)
        }
        const modalEle = modalRef.current
        const bsModal= Modal.getInstance(modalEle)
        bsModal.hide()
    };

    return (
        <>
        <div className="form-container">
            <form autoComplete="off" id="createForm" noValidate onSubmit={handleSubmit}>
                <fieldset {...openC}>
                    <div className="row">
                        <div className="form-floating col-4">
                            <input type="text" className={`form-control ${(formErrors && formErrors.first_name)?'is-invalid':(postData.first_name)?'is-valid':''}`}  name="first_name" id="first_name" value={postData.first_name} onChange={(e) => handleChange(e)} placeholder="Your First Name" />
                            <label htmlFor="first_name" className="pl-3">Your First Name</label>
                        </div>
                        <div className="form-floating col-4">
                            <input type="text" className={`form-control ${(formErrors && formErrors.last_name)?'is-invalid':(postData.last_name)?'is-valid':''}`} name="last_name" id="last_name" value={postData.last_name} onChange={(e) => handleChange(e)} placeholder="Your Last Name" />
                            <label htmlFor="last_name" className="pl-3">Your Last Name</label>
                        </div>
                        <div className="form-floating col-4">
                            <input type="email" className={`form-control ${(formErrors && formErrors.email)?'is-invalid':(postData.email)?'is-valid':''}`} name="email" id="email" value={postData.email} onChange={(e) => handleChange(e)} placeholder="Enter Your Email" />
                            <label htmlFor="email" className="pl-3">Enter Your Email</label>
                        </div>
                        <div className="form-floating col-4">
                            <input type="text" className={`form-control ${(formErrors && formErrors.company)?'is-invalid':(postData.company)?'is-valid':''}`} name="company" id="company" value={postData.company} onChange={(e) => handleChange(e)} placeholder="Your Company Name" />
                            <label htmlFor="company" className="pl-3">Your Company Name</label>
                        </div>
                        <div className="form-floating col-4">
                            <input type="text" className={`form-control ${(formErrors && formErrors.mobile)?'is-invalid':(postData.mobile)?'is-valid':''}`} name="mobile" id="mobile" value={postData.mobile} onChange={(e) => handleChange(e)} placeholder="Enter Your Contact No" />
                            <label htmlFor="mobile" className="pl-3">Your Contact No</label>
                        </div>
                        <div className="form-floating col-4">
                            <select className="form-select" id="segment" name="segment" value={postData.segment} onChange={(e) => handleChange(e)}>
                                <option>Choose Your relavent Segment</option>
                                <option value="Digital Solutions">Digital Solutions</option>
                                <option value="Finishes">Finishes</option>
                                <option value="Structures and Systems">Structures and Systems</option>
                            </select>
                            <label htmlFor="segment" className="pl-3">Select Segment</label>
                        </div>
                        <div className="col-12 mb-4 mt-3">
                            <label htmlFor="products" className="d-block mb-2">I’m interested in learning more about the following products/services:</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" name="products[]" value="3D Exterior Rendering"  onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">3D Exterior Rendering</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" name="products[]" value="3D Interior Rendering" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox2">3D Interior Rendering</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" name="products[]" value="Product Rendering" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox3">Product Rendering</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" name="products[]" value="Virtual Reality Tours" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox4">Virtual Reality Tours</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5" name="products[]" value="X-Series" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox5">X-Series</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox6" name="products[]" value="Website Development" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox6">Website Development</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox7" name="products[]" value="Mobile Applications" onClick={(e) => { onChangeProduct(e);}} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox7">Mobile Applications</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onClick={(e) => { onChangeProduct(e);}} type="checkbox" id="inlineCheckbox8" name="products[]" value="Other" />
                                    <label className="form-check-label" htmlFor="inlineCheckbox8">Other
                                    {openPOther.show?
                                    <input type="text" className="form-control-inline m-0" id="other_service" placeholder="Enter here" value={postData.other_service} onChange={(e) => setPostData({ ...postData, other_service: e.target.value })} />
                                    :''}</label>
                                </div>
                        </div>
                        <div className="col-12 mb-4">
                            <label htmlFor="contact_mode" className="d-block mb-2">Please contact me via the below option to discuss next steps:</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckboxT1" name="contact_mode[]" value="Phone Followup" onChange={(e) => { onChangeContactMode(e);}}  />
                                    <label className="form-check-label" htmlFor="inlineCheckboxT1">Phone Followup</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckboxT2" name="contact_mode[]" value="Email Followup" onChange={(e) => { onChangeContactMode(e);}}  />
                                    <label className="form-check-label" htmlFor="inlineCheckboxT2">Email Followup</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckboxT3" name="contact_mode[]" value="In Person Meeting" onChange={(e) => { onChangeContactMode(e);}} />
                                    <label className="form-check-label me-4" htmlFor="inlineCheckboxT3">In Person Meeting</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={(e) => { onChangeContactMode(e);}} type="checkbox" id="inlineCheckboxT4" name="contact_mode[]"  value="Other" />
                                    <label className="form-check-label" htmlFor="inlineCheckboxT4">Other
                                    {openCOther.show?
                                    <input type="text" className="form-control-inline m-0" id="other_mode" placeholder="Enter here" value={postData.other_mode} onChange={(e) => setPostData({ ...postData, other_mode: e.target.value })} />
                                    :''}</label>
                                </div>
                        </div>
                        <div className="col-12 mb-4">
                            <label htmlFor="contact_after" className="d-block mb-2">Please contact me after:</label>
                            <input type="radio" className="btn-check" value="tradeshow" name="contact_after" id="inputRadio1" checked={postData.contact_after === 'tradeshow'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio1">Tradeshow</label>
                            <input type="radio" className="btn-check" value="1 Day" name="contact_after" id="inputRadio2" checked={postData.contact_after === '1 Day'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio2">1 Day</label>
                            <input type="radio" className="btn-check" value="7 Days" name="contact_after" id="inputRadio3" checked={postData.contact_after === '7 Days'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio3">7 Days</label>
                            <input type="radio" className="btn-check" value="15 Days" name="contact_after" id="inputRadio4" checked={postData.contact_after === '15 Days'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio4">15 Days</label>
                            <input type="radio" className="btn-check" value="1 Month" name="contact_after" id="inputRadio5" checked={postData.contact_after === '1 Month'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio5">1 Month</label>
                            <input type="radio" className="btn-check" value="date" name="contact_after" id="inputRadio6" checked={postData.contact_after === 'date'} onChange={(e) => {setPostData({...postData, contact_after:e.target.value})}} />
                            <label className="btn btn-outline-info me-2 btn-sm" htmlFor="inputRadio6">Select Date</label>
                            {postData.contact_after === 'date' ? 
                                <DatePicker className="mydate" placeholderText="Please select the date" shouldCloseOnSelect={true} selected={postData.date} onChange={(date) => {setPostData({...postData, date:date})}} />
                                 :'' }

                        </div>
                        <div className="form-floating col-12">
                            <textarea className="form-control" placeholder="Specific Interest/Request" name="comments" id="comments" value={postData.comments} onChange={(e) => setPostData({ ...postData, comments: e.target.value })}></textarea>
                            <label htmlFor="comments">Specific Interest/Request</label>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-6 text-start">
                            { (openP.disabled === true) ?
                                <button className="btn btn-warning brv-btn" type="button" onClick={() => {clear()}}>Reset</button>
                                : '' }
                        </div>
                        <div className="col-6 text-end">
                        <button className="btn btn-primary brv-btn" type="button" onClick={() => {enableAgent()}}>Save Information</button>
                        </div>
                    </div>
                </fieldset>
                <fieldset {...openP}>
                    <div className="row">
                        <div className="form-floating col-6">
                            <textarea className="form-control" placeholder="For Agent Use Only" name="agent_comment" id="agent_comment" value={postData.agent_comment} onChange={(e) => setPostData({ ...postData, agent_comment: e.target.value })}></textarea>
                            <label htmlFor="agent_comment">For Agent Use Only</label>
                        </div>
                        <div className={`form-floating col-6 ${(openP.disabled || postData.agent_comment.length === 0)?'d-none':postData.agent_comment.length}`}>
                            <button onClick={() => setTag('Cold')} className={`btn btn-sm me-2  ${postData.tags.includes('Cold')?' btn-success':' btn-outline-secondary'}` } type="button">Cold</button>
                            <button onClick={() => setTag('Hot')} className={`btn btn-sm me-2  ${postData.tags.includes('Hot')?' btn-success':' btn-outline-secondary'}` } type="button">Hot</button>
                            <button onClick={() => setTag('Warm')} className={`btn btn-sm me-2  ${postData.tags.includes('Warm')?' btn-success':' btn-outline-secondary'}` } type="button">Warm</button>
                            <button onClick={() => setTag('Interested')} className={`btn btn-sm me-2  ${postData.tags.includes('Interested')?' btn-success':' btn-outline-secondary'}` } type="button">Interested</button>
                            <button onClick={() => setTag('Client')} className={`btn btn-sm me-2  ${postData.tags.includes('Client')?' btn-success':' btn-outline-secondary'}` } type="button">Client</button>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-6 text-start">
                            { (openP.disabled === false) ?
                                <button className="btn btn-warning brv-btn" type="button" onClick={() => {clear()}}>Reset</button>
                                : '' }
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-success brv-btn" type="submit">Final Submit</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <ul className="list-group list-group-flush">
                            { findProspects.map(name => (  
                                <li className="list-group-item" key={name._id}>  
                                     Are You <b>{name.first_name} {name.last_name}</b> from <b>{name.company}</b> ?
                                    <button className="btn btn-outline-dark btn-sm mb-2" onClick={() => { hideModal(name) }}> Yes</button> 
                                </li>  
                            )) }
                            <li  className="list-group-item"> <button className="btn btn-outline-secondary btn" onClick={() => { hideModal(0) }}>None Of The Above</button>  </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
  
export function validEmail(text) {
    const regex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
     
    return !regex.test(text);
}

export default Form;
  