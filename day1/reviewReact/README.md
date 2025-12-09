# Review React 

### Chapter 1 - About React and Next.js
### Chapter 2 - Rendering User Interfaces (UI)
### Chapter 3 - Updating UI with Javascript
### Chapter 4 - Getting Started with React
### Chapter 5 - Building UI with Components
### Chapter 6 - Displaying Data with Props
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
### Chapter 7 - Adding Interactivity with State

function HomePage(){
    const [likes, getLikes] = React.useState(0);

    function handelClick(){
        setLikes(likes + 1)
    }
}

### Chapter 8 - From React to Next.js
### Chapter 9 - Installing Next.js
/index.html
### Chapter 10 - Server and Client Components
/page.js
/layout.js
/like-button.js


