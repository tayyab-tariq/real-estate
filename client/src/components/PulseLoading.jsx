import { PulseLoader } from "react-spinners";

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#228B22',
  fontWeight: 'bold',
};

const override = {
  display: "inline",
  marginLeft: "2rem",
};

const PulseLoading = () => {
  return (
    <div style={styles}>
      <p>
        Initializing Server <PulseLoader color="#008cff" cssOverride={override} size={10}/>
        <br /> Please try again in a couple of minutes
      </p>
    </div>
        
  );
};

export default PulseLoading;