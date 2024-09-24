import {Link, useNavigate} from "react-router-dom";
import { useImmer } from "use-immer";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';
import {useState, useEffect} from "react";
import Select from 'react-select';

export default function CreateRole() {
    const [permissionList, setPermissionList] = useState([]);
    const [roleFormData, setRoleFormData] = useImmer({
        name: '',
        guard_name: '',
        permissions: '',
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // get permission list data
    useEffect(() => {
        $axios.get('permissions/active').then((response) => {
            setPermissionList([
                ...response.data.data
            ]);
        });
    }, []);

    function updateFormData(property, value) {
        setRoleFormData((draft) => {
            draft[property] = value;
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        toast.loading('Loading...');
        $axios.post('roles', useFormData({
            ...roleFormData,
            permissions: JSON.stringify(roleFormData.permissions)
        }))
            .then(res => {
                toast.dismiss();
                toast.success(res?.data?.message ?? 'Success');
                navigate("/admin/roles");
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
                                Name
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       value={roleFormData.name}
                                       onInput={(e) => updateFormData('name', e.target.value)}
                                       name="name"
                                       id="name"
                                       autoComplete="given-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="guard_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Guard Name
                            </label>
                            <div className="mt-2">
                                <input type="text"
                                       name="guard_name"
                                       value={roleFormData.guard_name}
                                       onInput={(e) => updateFormData('guard_name', e.target.value)}
                                       id="guard_name"
                                       autoComplete="family-name"
                                       className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                           'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="permissions" className="block text-sm font-medium leading-6 text-gray-900">
                                Permissions
                            </label>
                            <div className="mt-2">
                                <Select
                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="permissions"
                                    id="permissions"
                                    options={permissionList}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id_enc}
                                    value={roleFormData.permissions}
                                    onChange={(selectedItems) => {
                                        setRoleFormData((draft) => {
                                            draft.permissions = selectedItems;
                                        })
                                    }}
                                    placeholder="Select Permissions"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin/roles" type="button" className="custom-btn-border-gray-300">Back</Link>
                <button className="custom-btn-primary">Save</button>
            </div>
        </form>
    )
}
