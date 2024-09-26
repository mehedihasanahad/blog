import { useImmer } from "use-immer";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';
import {useState, useEffect} from "react";
import Select from 'react-select';
import { useContext } from "react"
import { userInfoContext } from "../../../store";

export default function Profile() {
    const userInfo = useContext(userInfoContext);
    const [roleList, setRoleList] = useState(null);
    const [userProfileData, setUserFormData] = useImmer({
        username: '',
        name: '',
        bio: '',
        profile_image: '',
        profile_img_url: '',
        roles: [],
    });
    const [errors, setErrors] = useState(null);

    // get role list data
    useEffect(() => {
        $axios.get('roles/active').then((response) => {
            setRoleList([
                ...response.data.data
            ]);
        });

        userInfo && setUserFormData((draft) => {
            draft.username = userInfo.username;
            draft.name = userInfo.name;
            draft.roles = userInfo.roles;
            draft.profile_image = userInfo.profile_image;
            draft.bio = userInfo.bio;
        });
    }, [userInfo]);

    function updateFormData(property, value) {
        setUserFormData((draft) => {
            draft[property] = value;
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        toast.loading('Loading...');
        $axios.post(`update-profile/${userInfo.id_enc}`, useFormData({
            '_method': 'PUT',
            ...userProfileData,
            roles: []
        }))
            .then(res => {
                toast.dismiss();
                toast.success(res?.data?.message ?? 'Success');
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
        <div className="bg-white shadow-md p-4 sm:flex sm:justify-center">
            <form onSubmit={handleFormSubmit} className="sm:w-[50%]" name="categoryForm">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid gap-x-6 gap-y-8">
                            <div className="mb-2">
                                <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                    Profile image <span className="text-red-700 text-lg">*</span>
                                </label>
                                <div>
                                    {
                                        userProfileData.profile_img_url ? 
                                        <img src={userProfileData.profile_img_url} height="250" width="250" className="object-contain border rounded-md border-gray-200"/> :
                                        (
                                            userProfileData.profile_image && 
                                            <img src={userProfileData.profile_image} height="250" width="250" className="object-contain border rounded-md border-gray-200"/>
                                        )
                                    }
                                </div>
                                <div className="mt-4">
                                    <input type="file"
                                        name="profile_image"
                                        // value={postFormData.featured_image}
                                        onChange={(e) => {
                                            updateFormData('profile_image', e.target.files?.[0]);
                                            updateFormData('profile_img_url', URL.createObjectURL(e.target.files?.[0]));
                                        }}
                                        id="profile_image"
                                        accept="image/*"
                                        className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                            'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0 bg-white'}/>
                                </div>
                            </div>
                            
                            <div className="mb-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username <span className="text-red-700 text-lg">*</span>
                                </label>
                                <div className="mt-2">
                                    <input type="text"
                                        value={userProfileData.username}
                                        onInput={(e) => updateFormData('username', e.target.value)}
                                        name="username"
                                        id="username"
                                        autoComplete="given-name"
                                        className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                            'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                                </div>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name <span className="text-red-700 text-lg">*</span>
                                </label>
                                <div className="mt-2">
                                    <input type="text"
                                        name="name"
                                        value={userProfileData.name}
                                        onInput={(e) => updateFormData('name', e.target.value)}
                                        id="name"
                                        autoComplete="family-name"
                                        className={'px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                                            'placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-0'}/>
                                </div>
                            </div>

                            <div className="mb-2">
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
                                        value={userProfileData.roles}
                                        onChange={(selectedItems) => {
                                            setUserFormData((draft) => {
                                                draft.roles = selectedItems;
                                            })
                                        }}
                                        isDisabled={true}
                                        placeholder="Select Roles"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="bio"
                                    className="block text-sm font-medium leading-6 text-gray-900">Bio</label>
                                <div className="mt-2">
                                    <textarea
                                    id="bio"
                                    name="bio"
                                    value={userProfileData.bio}
                                    onInput={(e) => updateFormData('bio', e.target.value)}
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
                    <button className="custom-btn-primary">Update Profile</button>
                </div>
            </form>
        </div>
    )
}
