export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: 45,
    backgroundColor: "#f9fafb",
    borderColor: state.isFocused ? "#111827" : "#ccc",
    borderRadius: "8px",
    boxShadow: state.isFocused ? "#E43D12" : "none",
    width: window.innerWidth <= 768 ? "100%" : "475px", // Responsive width
    "&:hover": {
      borderColor: "#111827",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#E43D12"
      : state.isFocused
      ? "#f7f6f1"
      : "transparent",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#f7f6f1",
      color: "#333",
    },
  }),
};
