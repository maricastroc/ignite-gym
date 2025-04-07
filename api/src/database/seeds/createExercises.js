exports.seed = async function (knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      name: 'Incline Barbell Bench Press',
      series: 4,
      repetitions: 12,
      group: 'chest',
      demo: 'incline_barbell_benchpress.gif',
      thumb: 'incline_barbell_benchpress.jpg',
    },
    {
      name: 'Dumbbell Fly',
      series: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'dumbbell_fly.gif',
      thumb: 'dumbbell_fly.jpg'
    },
    {
      name: 'Barbell JM Press',
      series: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'barbell_jm_press.gif',
      thumb: 'barbell_jm_press.jpg'
    },
    {
      name: 'Chest Dips',
      series: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'chest_dips.gif',
      thumb: 'chest_dips.jpg'
    },
    {
      name: 'Dumbbell One Arm Triceps Extension',
      series: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'dumbbell_one_arm_triceps_extension.gif',
      thumb: 'dumbbell_one_arm_triceps_extension.jpg'
    },
    {
      name: 'Cable Crossover',
      series: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'cable_crossover.gif',
      thumb: 'cable_crossover.jpg'
    },
    {
      name: 'Triceps Rope Push-Down',
      series: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'triceps_rope_pushdown.gif',
      thumb: 'triceps_rope_pushdown.jpg'
    },
    {
      name: 'Barbell Skull Crusher',
      series: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'barbell_skull_crusher.gif',
      thumb: 'barbell_skull_crusher.jpg'
    },
    {
      name: 'Deadlift',
      series: 3,
      repetitions: 12,
      group: 'legs',
      demo: 'deadlift.gif',
      thumb: 'deadlift.jpg'
    },
    {
      name: 'Pulldown',
      series: 3,
      repetitions: 12,
      group: 'back',
      demo: 'pulldown.gif',
      thumb: 'pulldown.jpg'
    },
    {
      name: 'Cable-Rear Pulldown',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'cable_rear_pulldown.gif',
      thumb: 'cable_rear_pulldown.jpg'
    },
    {
      name: 'Seated Cable Row',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'seated_cable_row.gif',
      thumb: 'seated_cable_row.jpg'
    },
    {
      name: 'Dumbbell Row',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'dumbbell_row.gif',
      thumb: 'dumbbell_row.jpg'
    },
    {
      name: 'Seated Dumbbell Front Raise',
      series: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'seated_dumbbell_front_raise.gif',
      thumb: 'seated_dumbbell_front_raise.jpg'
    },
    {
      name: 'EZ-Bar Scott Curl',
      series: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'ez_bar_scott_curl.gif',
      thumb: 'ez_bar_scott_curl.jpg'
    },
    {
      name: 'Straight Barbell Curl',
      series: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'straight_barbell_curl.gif',
      thumb: 'straight_barbell_curl.jpg'
    },
    {
      name: 'Standing Hammer Curl',
      series: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'standing_hammer_curl.gif',
      thumb: 'standing_hammer_curl.jpg'
    },
    {
      name: 'Wrist Curl',
      series: 4,
      repetitions: 12,
      group: 'forearm',
      demo: 'wrist_curl.gif',
      thumb: 'wrist_curl.jpg'
    },
    {
      name: 'Dumbbell Hammer Curl',
      series: 4,
      repetitions: 12,
      group: 'forearm',
      demo: 'dumbbell_hammer_curl.gif',
      thumb: 'dumbbell_hammer_curl.jpg'
    },
    {
      name: 'Barbell Reverse Curl',
      series: 4,
      repetitions: 12,
      group: 'forearm',
      demo: 'barbell_reverse_curl.gif',
      thumb: 'barbell_reverse_curl.jpg'
    },
    {
      name: '45-Degree Leg Press',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: '45_degree_leg_press.gif',
      thumb: '45_degree_leg_press.jpg'
    },
    {
      name: 'Leg Extension',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'leg_extension.gif',
      thumb: 'leg_extension.jpg'
    },
    {
      name: 'Hip Abduction Machine',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'hip_abduction_machine.gif',
      thumb: 'hip_abduction_machine.jpeg'
    },
    {
      name: 'Stiff-Leg Deadlift',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'stiff.gif',
      thumb: 'stiff.jpg',
    },
    {
      name: 'Neck Press',
      series: 4,
      repetitions: 10,
      group: 'shoulders',
      demo: 'neck_press.gif',
      thumb: 'neck_press.jpg'
    },
    {
      name: 'Machine Shoulder Press',
      series: 3,
      repetitions: 10,
      group: 'shoulders',
      demo: 'machine_shoulder_press.gif',
      thumb: 'machine_shoulder_press.jpg'
    },
    {
      name: 'Seated Alternating Raise Dumbbell',
      series: 4,
      repetitions: 10,
      group: 'shoulders',
      demo: 'seated_alternating_raise_dumbbell.gif',
      thumb: 'seated_alternating_raise_dumbbell.jpg'
    },
    {
      name: 'Dumbbell Shrugs',
      series: 4,
      repetitions: 10,
      group: 'trapezius',
      demo: 'dumbbell_shrug.gif',
      thumb: 'dumbbell_shrug.jpg'
    },
    {
      name: 'Lever Shrug',
      series: 4,
      repetitions: 10,
      group: 'trapezius',
      demo: 'lever_shrug.gif',
      thumb: 'lever_shrug.jpg'
    },
    {
      name: 'Bent Over Row',
      series: 4,
      repetitions: 10,
      group: 'trapezius',
      demo: 'bent_over_row.gif',
      thumb: 'bent_over_row.jpg'
    },
  ]);
};