import useAuthContext from "../../../Hooks/useAuthContext";


const UserHome = () => {
    const {user} = useAuthContext();
    return (
        <div>
            <div className="mt-10 mb-5">
                <h2 className="text-2xl font-semibold uppercase"><span>Hi, Welcome </span>{user ? user?.displayName : 'Back!'}</h2>
            </div>
        </div>
    );
};

export default UserHome;