import LogoutButton from './LogoutButton';

export default function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 mt-2  w-full mt-2">
      <p className="text-white">
        <a href="/home">NIMBLE AB</a>
      </p>
      <LogoutButton />
    </div>
  );
}
