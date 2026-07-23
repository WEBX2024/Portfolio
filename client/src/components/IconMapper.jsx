import { 
  FiCode, FiCpu, FiServer, FiTerminal, FiMail, FiMapPin, FiClock, 
  FiMonitor, FiMic, FiDatabase, FiBarChart, FiLayers, FiTool, FiCalendar
} from 'react-icons/fi';

export default function IconMapper({ icon, className = '' }) {
  const iconMap = {
    '💻': <FiCode className={className} />,
    '🤖': <FiCpu className={className} />,
    '⚙️': <FiServer className={className} />,
    '🧠': <FiTerminal className={className} />,
    '📧': <FiMail className={className} />,
    '📍': <FiMapPin className={className} />,
    '🕐': <FiClock className={className} />,
    '🧭': <FiClock className={className} />,
    '🖥️': <FiMonitor className={className} />,
    '🧰': <FiTool className={className} />,
    '🎙️': <FiMic className={className} />,
    '🗄️': <FiDatabase className={className} />,
    '📊': <FiBarChart className={className} />,
    '🏗️': <FiLayers className={className} />,
    '🛠️': <FiTool className={className} />,
    '📅': <FiCalendar className={className} />
  };

  return iconMap[icon] || <span>{icon}</span>;
}
