import {Link, useLocation, useNavigate} from "react-router-dom";
import { useImmer } from "use-immer";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';
import {useEffect, useState} from "react";
import Select from 'react-select';

export default function EditUser() {
    const [roleList, setRoleList] = useState(null);
    const { state: userData } = useLocation();
    const [userFormData, setUserFormData] = useImmer({
        _method: 'PUT',
        ...userData
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // get role list data
    useEffect(() => {
        $axios.get('roles/active').then((response) => {
            setRoleList([
                ...response.data.data
            ]);
        });
    }, []);

    // update input state onchange event
    function updateFormData(property, value) {
        setUserFormData((draft) => {
            draft[property] = value;
        });
    }

    // handle category edit form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        toast.loading('Loading...');
        $axios.post(`users/${userFormData.id_enc}`, useFormData({
            ...userFormData,
            roles: JSON.stringify(userFormData.roles)
        }))
            .then(res => {
                toast.dismiss();
                toast.success(res?.data?.message ?? 'Success');
                navigate("/admin/users");
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
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={userFormData.username}
                                       onInput={(e) => updateFormData('username', e.target.value)}
                                       name="username"
                                       id="username"
                                       autoComplete="given-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input type="email"
                                       name="email"
                                       value={userFormData.email}
                                       onInput={(e) => updateFormData('email', e.target.value)}
                                       id="email"
                                       autoComplete="family-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="bio"
                                   className="block text-sm font-medium leading-6 text-gray-900">Bio</label>
                            <div className="mt-2">
                                <textarea
                                  id="bio"
                                  name="bio"
                                  value={userFormData.bio}
                                  onInput={(e) => updateFormData('bio', e.target.value)}
                                  rows="3"
                                  className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                      'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0 resize-vertical'}>
                                </textarea>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Status
                            </label>
                            <div className="mt-2">
                                <select name="Status"
                                        id="status"
                                        value={userFormData.status}
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
                            <label htmlFor="roles" className="block text-sm font-medium leading-6 text-gray-900">
                                Roles
                            </label>
                            <div className="mt-2">
                                <Select
                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="roles"
                                    id="roles"
                                    options={roleList}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id_enc}
                                    value={userFormData.roles}
                                    onChange={(selectedItems) => {
                                        setUserFormData((draft) => {
                                            draft.roles = selectedItems;
                                        })
                                    }}
                                    placeholder="Select Roles"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin/users" type="button" className="custom-btn-border-gray-300">Back</Link>
                <button className="custom-btn-primary">Save</button>
            </div>
        </form>
    )
}
