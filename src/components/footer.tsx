import { Spacer } from '@geist-ui/core';

export default function Footer({ siteName }) {
  return (
    <div className="footer">
      <span>{siteName}</span>
      <span>&copy; {new Date().getFullYear()}</span>
      <div>
        <a href="/terms">Terms of Use</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  );
}
