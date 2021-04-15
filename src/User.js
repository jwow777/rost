export default function User({ item }) {
  return (
    <li>
      <span>{item.id}</span>
      <span>{item.username}</span>
      <span>{item.last_login}</span>
    </li>
  );
}