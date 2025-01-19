import { Card, CardBody, CardRoot } from "@chakra-ui/react";
import { useState } from "react";
import { Icon } from "react-feather";
import { Link } from "react-router";

const FeatureCard = ({
  Icon,
  title,
  href,
  descriptions,
  iconColor,
}: {
  descriptions: string[];
  href: string;
  title: string;
  Icon: Icon;
  iconColor: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={href}>
      <CardRoot
        className="relative overflow-hidden group cursor-pointer min-h-96 max-w-96"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="relative p-6 z-10">
          <div className="mb-4 relative">
            <div
              className={`
            w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center
            transform transition-all duration-500 ease-out
            ${isHovered ? "scale-110 rotate-12" : ""}
          `}
            >
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div
              className={`
            absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8
            transition-transform duration-700
            ${isHovered ? "scale-125" : "scale-100"}
          `}
            >
              <div className="absolute inset-0 rounded-full bg-blue-200/20" />
              <div className="absolute inset-2 rounded-full bg-blue-200/20" />
              <div className="absolute inset-4 rounded-full bg-blue-200/20" />
            </div>
          </div>

          {/* Content with Animations */}
          <div className="space-y-4">
            <h3
              className={`
            text-xl font-semibold transform transition-all duration-300
            ${isHovered ? "translate-x-2 text-blue-600" : "text-gray-900"}
          `}
            >
              {title}
            </h3>

            <div className="space-y-2">
              {descriptions.map((text, index) => (
                <p
                  key={index}
                  className={`
                  text-gray-600 flex items-center space-x-2
                  transform transition-all duration-500
                  ${isHovered ? "translate-x-2" : ""}
                `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span
                    className={`
                  w-1.5 h-1.5 rounded-full bg-blue-400
                  transform transition-all duration-300
                  ${isHovered ? "scale-150" : ""}
                `}
                  />
                  <span>{text}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent">
            <div
              className={`
            h-full bg-blue-500/20 transform transition-all duration-700
            ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }
          `}
            />
          </div>

          {/* Interactive Arrow */}
          <div
            className={`
          absolute bottom-4 right-4
          transform transition-all duration-500
          ${isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
        `}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500">
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </CardBody>
      </CardRoot>
    </Link>
  );
};

export default FeatureCard;
