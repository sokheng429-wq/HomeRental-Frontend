import React, { useState, useEffect } from "react";
import ScreenLoading from "./screens/ScreenLoading.jsx";
import ScreenLogin from "./screens/ScreenLogin.jsx";
import ScreenSignup from "./screens/ScreenSignup.jsx";
import ScreenHome from "./screens/ScreenHome.jsx";
import ScreenWishlist from "./screens/ScreenWishlist.jsx";
import ScreenProfile from "./screens/ScreenProfile.jsx";
import ScreenEditProfile from "./screens/ScreenEditProfile.jsx";
import ScreenLocation from "./screens/ScreenLocation.jsx";
import ScreenSecurity from "./screens/ScreenSecurity.jsx";
import ScreenChat from "./screens/ScreenChat.jsx";
import ScreenAddPost from "./screens/ScreenAddPost.jsx";
import BottomNav from "./components/BottomNav.jsx";
import { getToken, setToken, getMe } from "./api.js";

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser] = useState({ name: "" });

  // On first load: if we already have a token, try to restore the session
  // by asking the backend who we are. Otherwise fall back to the splash -> login flow.
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const token = getToken();
      if (!token) {
        setTimeout(() => {
          if (!cancelled) setScreen("login");
        }, 2200);
        return;
      }
      try {
        const me = await getMe();
        if (!cancelled) {
          setUser(me);
          setScreen("home");
        }
      } catch {
        setToken(null);
        if (!cancelled) setScreen("login");
      }
    }

    if (screen === "loading") bootstrap();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (s) => setScreen(s);

  const logout = () => {
    setToken(null);
    setUser({ name: "" });
    go("login");
  };

  const renderScreen = () => {
    switch (screen) {
      case "loading":
        return <ScreenLoading />;
      case "login":
        return <ScreenLogin go={go} setUser={setUser} />;
      case "signup":
        return <ScreenSignup go={go} setUser={setUser} />;
      case "home":
        return (
          <>
            <ScreenHome user={user} go={go} />
            <BottomNav screen="home" go={go} />
          </>
        );
      case "wishlist":
        return (
          <>
            <ScreenWishlist />
            <BottomNav screen="wishlist" go={go} />
          </>
        );
      case "profile":
        return <ScreenProfile user={user} go={go} logout={logout} />;
      case "editProfile":
        return <ScreenEditProfile user={user} setUser={setUser} go={go} />;
      case "location":
        return <ScreenLocation user={user} setUser={setUser} go={go} />;
      case "security":
        return <ScreenSecurity user={user} go={go} />;
      case "chat":
        return (
          <>
            <ScreenChat go={go} />
            <BottomNav screen="chat" go={go} />
          </>
        );
      case "addPost":
        return <ScreenAddPost go={go} />;
      default:
        return <ScreenLoading />;
    }
  };

  return (
    <div className="hr-root">
      <div className="hr-phone">
        <div className="hr-notch" />
        {renderScreen()}
      </div>
    </div>
  );
}
