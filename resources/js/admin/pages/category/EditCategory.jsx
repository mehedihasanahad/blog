import {Link, useLocation, useNavigate} from "react-router-dom";
import { useImmer } from "use-immer";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';
import {useEffect, useState} from "react";

export default function EditCategory() {
    const { state: categoryData } = useLocation();
    const [categoryFormData, setCategoryFormData] = useImmer({
        _method: 'PUT',
        ...categoryData
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // update input state onchange event
    function updateFormData(property, value) {
        setCategoryFormData((draft) => {
            draft[property] = value;
        });
    }

    // handle category edit form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        toast.loading('Loading...');
        $axios.post(`categories/${categoryFormData.id_enc}`, useFormData(categoryFormData))
            .then(res => {
                toast.dismiss();
                toast.success(res?.data?.message ?? 'Success');
                navigate("/admin/categories");
            })
            .catch(e => {
                toast.dismiss();
                toast.error(e?.response?.data?.message);
                e?.response?.data?.errors && setErrors({...e.response.data.errors});
            })
    }

    // handle error depends on errors state
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

    // call handleInputError method when the errors stage will be changed
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
                                Name <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={categoryFormData.name}
                                       onInput={(e) => updateFormData('name', e.target.value)}
                                       name="name"
                                       id="name"
                                       autoComplete="given-name"
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
                                       value={categoryFormData.slug}
                                       onInput={(e) => updateFormData('slug', e.target.value)}
                                       id="slug"
                                       autoComplete="family-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                Image
                            </label>
                            <div className="mt-2">
                                <input type="file"
                                    name="image"
                                    // value={postFormData.featured_image}
                                    onChange={(e) => {
                                        updateFormData('image', e.target.files?.[0]);
                                        updateFormData('image_url', URL.createObjectURL(e.target.files?.[0]));
                                    }}
                                    id="image"
                                    accept="image/*"
                                    className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                        'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0 bg-white'}/>
                            </div>
                            <div>
                                {
                                    categoryFormData?.image_url ? 
                                    <img src={categoryFormData?.image_url} height="100" width="100" className="object-contain"/> :
                                    (
                                        categoryFormData?.image && 
                                        <img src={categoryFormData.image} height="100" width="100" className="object-contain"/>
                                    )
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Status <span className="text-red-700 text-lg">*</span>
                            </label>
                            <div className="mt-2">
                                <select name="Status"
                                        id="status"
                                        value={categoryFormData.status}
                                        onChange={(e) => updateFormData('status', e.target.value)}
                                        autoComplete="family-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="description"
                                   className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  value={categoryFormData.description}
                                  onInput={(e) => updateFormData('description', e.target.value)}
                                  rows="3"
                                  className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                      'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0 resize-vertical'}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin/categories" type="button" className="custom-btn-border-gray-300">Back</Link>
                <button className="custom-btn-primary">Save</button>
            </div>
        </form>
    )
}
