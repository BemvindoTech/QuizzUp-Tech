import { QuizProvider, useQuiz } from './context/QuizContext';
import { HomeScreen } from './components/Home/HomeScreen';
import { QuizScreen } from './components/Quiz/QuizScreen';
import { ResultsScreen } from './components/Results/ResultsScreen';

function AppContent() {
  const { state } = useQuiz();

  switch (state.screen) {
    case 'quiz':
      return <QuizScreen />;
    case 'results':
      return <ResultsScreen />;
    case 'home':
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}
