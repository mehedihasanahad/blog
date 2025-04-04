import {Link, useNavigate} from "react-router-dom";
import { useImmer } from "use-immer";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';
import {useState, useEffect} from "react";
import Editor from "../../components/editor.jsx";
import { stateToHTML } from 'draft-js-export-html';
import Select from 'react-select';
import { usePermissionCheck } from "../../../helper/index.js";

export default function CreateBlog() {
    const [categoryList, setCategoryList] = useState([]);
    const [tagList, setTagList] = useState(null);
    const [postFormData, setPostFormData] = useImmer({
        title: '',
        subtitle: '',
        slug: '',
        contentRaw: '',
        content: '',
        is_featured: 0,
        is_published: 0,
        featured_image: '',
        featured_image_url: '',
        categories: [],
        tags: [],
        read_hour: '',
        read_minute: '',
        read_second: '',
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const hasPermission = usePermissionCheck();


    // get category list data
    useEffect(() => {
        $axios.get('categories/active').then((response) => {
            setCategoryList([
                ...response.data.data
            ]);
        });
    }, []);

    // get tags list data
    useEffect(() => {
        $axios.get('tags/active').then((response) => {
            setTagList([
                ...response.data.data
            ]);
        });
    }, []);

    function updateFormData(property, data) {
        setPostFormData((draft) => {
            draft[property] = data;
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        toast.loading('Loading...');
        $axios.post('posts', useFormData({
            ...postFormData,
            categories: JSON.stringify(postFormData.categories),
            tags: JSON.stringify(postFormData.tags),
        }))
            .then(res => {
                toast.dismiss();
                toast.success(res?.data?.message ?? 'Success');
                navigate("/admin/posts");
            })
            .catch(e => {
                toast.dismiss();
                toast.error(e?.response?.data?.message);
                e?.response?.data?.errors && setErrors({...e.response.data.errors});
            })
    }

    function handleInputError() {
        for (const errorsKey in errors) {
            if (errors[errorsKey].length > 0)
                document.forms.categoryForm[errorsKey].classList.add('ring-red-800');

            if (!document.forms.categoryForm[errorsKey].nextSibling) {
                const span = document.createElement('span');
                span.innerHTML = `<div class="text-red-800">${errors[errorsKey]}</div>`;
                document.forms.categoryForm[errorsKey].after(span);
            } else
                document.forms.categoryForm[errorsKey].nextSibling.innerHTML = `<div class="text-red-800">${errors[errorsKey]}</div>`;

        }
    }

    useEffect(() => {
        handleInputError();
    }, [errors])

    return (
        <form onSubmit={handleFormSubmit} name="categoryForm">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Title <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={postFormData.title}
                                       onInput={(e) => updateFormData('title', e.target.value)}
                                       name="title"
                                       id="name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="subtitle" className="block text-sm font-medium leading-6 text-gray-900">
                                Subtitle
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={postFormData.subtitle}
                                       onInput={(e) => updateFormData('subtitle', e.target.value)}
                                       name="subtitle"
                                       id="subtitle"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                                Slug <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                name="slug"
                                value={postFormData.slug}
                                onInput={(e) => updateFormData('slug', e.target.value)}
                                id="slug"
                                className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                    'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                            <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                                Category <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <Select
                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="categories"
                                    id="categories"
                                    options={categoryList}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id_enc}
                                    value={postFormData.categories}
                                    onChange={(selectedItems) => {
                                        setPostFormData((draft) => {
                                            draft.categories = selectedItems;
                                        })
                                    }}
                                    placeholder="Select Categories"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                Tag <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <Select
                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="tags"
                                    id="tags"
                                    options={tagList}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    value={postFormData.tags}
                                    onChange={(selectedItems) => {
                                        setPostFormData((draft) => {
                                            draft.tags = selectedItems;
                                        })
                                    }}
                                    placeholder="Select Categories"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>

                        {
                            hasPermission("post-status") &&
                            <div className="sm:col-span-3">
                                <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                    Status <span className="text-red-700 text-lg">*</span>
                                </label>
                                <div className="mt-2">
                                    <select name="Status"
                                            id="status"
                                            value={postFormData.is_published}
                                            onChange={(e) => updateFormData('is_published', e.target.value)}
                                        className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                            'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}>
                                        <option value="1">Publish</option>
                                        <option value="0">Hide</option>
                                    </select>
                                </div>
                            </div>
                        }

{
                            hasPermission("post-status") &&
                            <div className="sm:col-span-3">
                                <label htmlFor="featured" className="block text-sm font-medium leading-6 text-gray-900">
                                    Featured <span className="text-red-700 text-lg">*</span>
                                </label>
                                <div className="mt-2">
                                    <select name="featured"
                                            id="featured"
                                            value={postFormData.is_featured}
                                            onChange={(e) => updateFormData('is_featured', e.target.value)}
                                        className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                            'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                        }

                        <div className="sm:col-span-3">
                            <label htmlFor="read_hour" className="block text-sm font-medium leading-6 text-gray-900">
                                Read Time
                            </label>
                            <div className="mt-2 flex gap-x-2">
                                <input type="number"
                                name="read_hour"
                                value={postFormData.read_hour}
                                onInput={(e) => updateFormData('read_hour', e.target.value)}
                                id="read_hour"
                                placeholder="Hour"
                                className={'w-24 px-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                    'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>

                                <input type="number"
                                name="read_minute"
                                value={postFormData.read_minute}
                                onInput={(e) => updateFormData('read_minute', e.target.value)}
                                id="read_minute"
                                placeholder="Minute"
                                className={'w-24 px-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                    'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>

                                <input type="number"
                                name="read_second"
                                value={postFormData.read_second}
                                onInput={(e) => updateFormData('read_second', e.target.value)}
                                id="read_second"
                                placeholder="Second"
                                className={'w-24 px-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                    'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="f_image" className="block text-sm font-medium leading-6 text-gray-900">
                                Image <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <input type="file"
                                    name="featured_image"
                                    // value={postFormData.featured_image}
                                    onChange={(e) => {
                                        updateFormData('featured_image', e.target.files?.[0]);
                                        updateFormData('featured_image_url', URL.createObjectURL(e.target.files?.[0]));
                                    }}
                                    id="f_image"
                                    className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                        'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0 bg-white'}/>
                            </div>
                            <div>
                                {
                                    postFormData.featured_image_url && 
                                    <img src={postFormData.featured_image_url} height="100" width="100" className="object-contain"/>
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                Content <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <Editor
                                name="content"
                                editorState={postFormData.contentRaw}
                                onEditorStateChange={(stateContent) => {
                                    updateFormData('contentRaw', stateContent);
                                    updateFormData('content', stateToHTML(stateContent.getCurrentContent()));
                                }}
                                id="content"
                                className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                    'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin/posts" type="button" className="custom-btn-border-gray-300">Back</Link>
                <button className="custom-btn-primary">Save</button>
            </div>
        </form>
    )
}
