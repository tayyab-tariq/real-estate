import { PulseLoader } from "react-spinners";

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const FallbackLoading = () => {
  return (
    <div style={styles}>
    
        <PulseLoader color="#008cff" cssOverride={styles}/>
        
    </div>
        
  );
};

export default FallbackLoading;