import fs from 'fs';
let code = fs.readFileSync('src/pages/WomenPage.tsx', 'utf8');

code = code.replace(
  `  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSent(true);
    setTimeout(() => {
      setSubmissionSent(false);
      setSubmissionFormOpen(false);
      setSubmission({ name: '', email: '', organization: '', title: '', category: 'POLICY_RIGHTS', abstract: '' });
    }, 2500);
  };`,
  `  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/public/telexes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          company: submission.organization,
          bureau: submission.category,
          message: \`Title: \${submission.title}\\n\\nAbstract: \${submission.abstract}\`
        })
      });
      setSubmissionSent(true);
      setTimeout(() => {
        setSubmissionSent(false);
        setSubmissionFormOpen(false);
        setSubmission({ name: '', email: '', organization: '', title: '', category: 'POLICY_RIGHTS', abstract: '' });
      }, 2500);
    } catch (e) {
      console.error(e);
    }
  };`
);

fs.writeFileSync('src/pages/WomenPage.tsx', code);
