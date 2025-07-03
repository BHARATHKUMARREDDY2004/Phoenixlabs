import female_doc from '@/assets/images/female_doc.png';
import male_doc from '@/assets/images/male_doc.png';

import dashboard from '@/assets/icons/dashboard.png';
import calendar from '@/assets/icons/calendar.png';
import history from '@/assets/icons/history.png';
import message from '@/assets/icons/message.png';
import account from '@/assets/icons/account.png';

export const images = {
  female_doc,
  male_doc,
};

export const onboarding = [
  {
    id: 1,
    title: 'Revolutionizing Patient-Centric Healthcare',
    description:
      'Delivering personalized treatment plans, timely medication, and modern health tracking for every patient.',

    image: images.female_doc,
  },
  {
    id: 2,
    title: 'Empowering Wellness Through Innovation',
    description:
      'Bringing smart health monitoring, accessible care, and efficient delivery services to your doorstep.',

    image: images.male_doc,
  },
];

export const icons = {
  dashboard,
  calendar,
  message,
  account,
  history,
};
