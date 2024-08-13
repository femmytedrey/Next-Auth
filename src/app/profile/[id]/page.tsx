const Users = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <p className="mt-5">
        Welcome to user's profile <span className="p-3 bg-teal-600 ml-3">{params.id}</span>
      </p>
    </div>
  );
};

export default Users;
