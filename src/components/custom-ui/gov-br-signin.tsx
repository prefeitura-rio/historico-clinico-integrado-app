import React from "react";

interface GovBrSignInButtonProps {
  onClick?: () => void;
}

const GovBrSignInButton: React.FC<GovBrSignInButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#1351b4] text-white font-semibold px-4 py-2 rounded-full text-base flex items-center justify-center shadow-md hover:bg-[#396dc0] transition w-full"
      style={{ fontFamily: "'Rawline', sans-serif" }}
    >
      <div className="flex items-center gap-1">
        <span className="text-base">Entrar com</span>
        <span className="font-extrabold text-base">gov.br</span>
      </div>
    </button>
  );
};

export default GovBrSignInButton;
