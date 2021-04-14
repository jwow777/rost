export default function Users({setLoggedIn}) {
  function logout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }
  return (
    <main className='content'>
      <a onClick={logout}>Выйти</a>
    </main>
  );
}