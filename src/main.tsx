import ReactDOM from 'react-dom/client';
import App from './App';
import KanbanProvider from './context/kanban.context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <KanbanProvider>
    <App />
  </KanbanProvider>
)
