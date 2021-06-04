import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

function App() {
  // active tabs to know the active tabs
  const [value, setValue] = useState(0);
  const [selectedIndex, setselectedIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setselectedIndex}
        />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/services" component={() => <div>services</div>} />
          <Route exact path="/customsoftware" component={() => <div>Custom Sofware</div>} />
          <Route exact path="/mobileapps" component={() => <div>Mobile Apps</div>} />
          <Route exact path="/websites" component={() => <div>Websites</div>} />
          <Route exact path="/revolution" component={() => <div>The revolution</div>} />
          <Route exact path="/about" component={() => <div>About Us</div>} />
          <Route exact path="/contact" component={() => <div>Contact Us</div>} />
          <Route exact path="/estimate" component={() => <div>estimate</div>} />
        </Switch>
        <Footer
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setselectedIndex} />
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
