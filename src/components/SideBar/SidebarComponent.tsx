import { useNavigate } from "react-router-dom";
import "./SidebarComponent.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../reudux/reduce/SidebarSlice";

const SidebarComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // gửi value lọc đi
  const handlefillter = (data1: string) => {
    dispatch(changeStatus(data1));
    navigate("/");
  };

  // hiển thị thanh sidebar cho đạn
  const sidebarStatus: any = useSelector<any>(
    (state) => state.HeaderSlice.data
  );

  return (
    <div className="sidebar1">
      <p>FILTER BY</p>
      {sidebarStatus === "bullet" ? (
        <>
          {/* fillter cho đạn */}
          <div className="sidebar2">
            <p>Caliber</p>
            <button onClick={() => handlefillter("Caliber,0.20")}>0.20</button>
            <button onClick={() => handlefillter("Caliber,0.22")}>0.22</button>
            <button onClick={() => handlefillter("Caliber,0.25")}>0.25</button>
            <button onClick={() => handlefillter("Caliber,0.30")}>0.30</button>
            <button onClick={() => handlefillter("Caliber,0.45")}>0.45</button>
            <button onClick={() => handlefillter("Caliber,0.50")}>0.50</button>
          </div>
          <div className="sidebar2">
            <p>Price</p>
            <button onClick={() => handlefillter("bullet,0-10")}>
              $ 0 - $ 10
            </button>
            <button onClick={() => handlefillter("bullet,10-20")}>
              $ 10 - $ 20
            </button>
          </div>
          <div className="sidebar2">
            <p>Ammo Weight</p>
            <button onClick={() => handlefillter("AmmoWeight,10.30")}>
              10.30
            </button>
            <button onClick={() => handlefillter("AmmoWeight,10.40")}>
              10.40
            </button>
            <button onClick={() => handlefillter("AmmoWeight,10.60")}>
              10.60
            </button>
            <button onClick={() => handlefillter("AmmoWeight,11.45")}>
              11.45
            </button>
            <button onClick={() => handlefillter("AmmoWeight,12.96")}>
              12.96
            </button>
            <button onClick={() => handlefillter("AmmoWeight,14.50")}>
              14.50
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar2">
            <p>Velocity (FPS)</p>
            <button onClick={() => handlefillter("velocity,250-500")}>
              250 - 500
            </button>
            <button onClick={() => handlefillter("velocity,500-750")}>
              500 - 750
            </button>
            <button onClick={() => handlefillter("velocity,750-1000")}>
              750 - 1000
            </button>
            <button onClick={() => handlefillter("velocity,1000-2000")}>
              1000 and Up
            </button>
          </div>
          <div className="sidebar2">
            <p>Price</p>
            <button onClick={() => handlefillter("rifle-pistols,0-100")}>
              $ 0 - $ 100
            </button>
            <button onClick={() => handlefillter("rifle-pistols,100-250")}>
              $ 100 - $ 250
            </button>
            <button onClick={() => handlefillter("rifle-pistols,250-500")}>
              $ 250 - $ 500
            </button>
            <button onClick={() => handlefillter("rifle-pistols,500-1000")}>
              $ 500 - $ 1,000
            </button>
            <button onClick={() => handlefillter("rifle-pistols,1000-2000")}>
              $ 1,000+
            </button>
          </div>
          <div className="sidebar2">
            <p>Loudness</p>
            <button onClick={() => handlefillter("Loudness,1")}>Low</button>
            <button onClick={() => handlefillter("Loudness,2")}>Medium</button>
            <button onClick={() => handlefillter("Loudness,3")}>High</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarComponent;
