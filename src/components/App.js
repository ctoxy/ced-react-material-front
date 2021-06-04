import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Services from './Services';
import CustomSoftware from './CustomSoftware';
import MobileApps from './MobileApps';
import Websites from './Websites';
import About from './About';
import Contact from './Contact';
function App() {
  // active tabs to know the active tabs
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Switch>
          <Route exact path="/" render={(props) => <LandingPage {...props} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
          <Route
            exact
            path="/services"
            render={props => (
              <Services
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route
            exact
            path="/customsoftware"
            render={props => (
              <CustomSoftware
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route
            exact
            path="/mobileapps"
            render={props => (
              <MobileApps
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route
            exact
            path="/websites"
            render={props => (
              <Websites
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route exact path="/revolution" component={() => <div>The revolution</div>} />
          <Route
            exact
            path="/about"
            render={props => (
              <About
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route
            exact
            path="/contact"
            render={props => (
              <Contact
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          />
          <Route exact path="/estimate" component={() => <div>estimate</div>} />
        </Switch>
        <Footer
          setValue={setValue}
          setSelectedIndex={setSelectedIndex} />
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
