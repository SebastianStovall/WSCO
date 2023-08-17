from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text
from .post_data import posts


def seed_posts():
    for post in posts:
        new_post = Post(
            userId=post['userId'],
            photoUrl=post['photoUrl'],
            caption=post['caption']
        )

        db.session.add(new_post)
    db.session.commit()


    # QUERY FOR THE USER INSTANCES
    demo_user = User.query.get(1)
    clara_user = User.query.get(2)
    john_user = User.query.get(3)


    # QUERY FOR THE POST INSTANCES

    post_2 = Post.query.get(2)    # owned by user 1
    post_3 = Post.query.get(3)    # owned by user 1
    post_4 = Post.query.get(4)    # owned by user 1

    post_12 = Post.query.get(12)  # owned by user 2
    post_13 = Post.query.get(13)  # owned by user 2
    post_14 = Post.query.get(14)  # owned by user 2

    post_22 = Post.query.get(22)  # owned by user 3
    post_23 = Post.query.get(23)  # owned by user 3
    post_24 = Post.query.get(24)  # owned by user 3

    post_15 = Post.query.get(15)
    post_16 = Post.query.get(16)
    post_17 = Post.query.get(17)
    post_18 = Post.query.get(18)

    post_25 = Post.query.get(25)
    post_26 = Post.query.get(26)
    post_27 = Post.query.get(27)
    post_28 = Post.query.get(28)
    post_29 = Post.query.get(29)


    post_31 = Post.query.get(31)
    post_32 = Post.query.get(32)
    post_33 = Post.query.get(33)
    post_34 = Post.query.get(34)


    post_35 = Post.query.get(35)
    post_36 = Post.query.get(36)
    post_37 = Post.query.get(37)
    post_38 = Post.query.get(38)


    post_41 = Post.query.get(41)
    post_42 = Post.query.get(42)
    post_43 = Post.query.get(43)
    post_44 = Post.query.get(44)


    post_45 = Post.query.get(45)
    post_46 = Post.query.get(46)
    post_47 = Post.query.get(47)
    post_48 = Post.query.get(48)


    post_51 = Post.query.get(51)
    post_52 = Post.query.get(52)
    post_53 = Post.query.get(53)
    post_54 = Post.query.get(54)


    post_55 = Post.query.get(55)
    post_56 = Post.query.get(56)
    post_57 = Post.query.get(57)
    post_58 = Post.query.get(58)


    post_61 = Post.query.get(61)
    post_62 = Post.query.get(62)
    post_63 = Post.query.get(63)
    post_64 = Post.query.get(64)


    post_65 = Post.query.get(65)
    post_66 = Post.query.get(66)
    post_67 = Post.query.get(67)
    post_68 = Post.query.get(68)


    post_71 = Post.query.get(71)
    post_72 = Post.query.get(72)
    post_73 = Post.query.get(73)
    post_74 = Post.query.get(74)


    post_75 = Post.query.get(75)
    post_76 = Post.query.get(76)
    post_77 = Post.query.get(77)
    post_78 = Post.query.get(78)


    post_81 = Post.query.get(81)
    post_82 = Post.query.get(82)
    post_83 = Post.query.get(83)
    post_84 = Post.query.get(84)


    post_85 = Post.query.get(85)
    post_86 = Post.query.get(86)
    post_87 = Post.query.get(87)
    post_88 = Post.query.get(88)


    post_91 = Post.query.get(91)
    post_92 = Post.query.get(92)
    post_93 = Post.query.get(93)
    post_94 = Post.query.get(94)


    post_95 = Post.query.get(95)
    post_96 = Post.query.get(96)
    post_97 = Post.query.get(97)
    post_98 = Post.query.get(98)


    post_101 = Post.query.get(101)
    post_102 = Post.query.get(102)
    post_103 = Post.query.get(103)
    post_104 = Post.query.get(104)


    post_105 = Post.query.get(105)
    post_106 = Post.query.get(106)
    post_107 = Post.query.get(107)
    post_108 = Post.query.get(108)


    post_111 = Post.query.get(111)
    post_112 = Post.query.get(112)
    post_113 = Post.query.get(113)
    post_114 = Post.query.get(114)


    post_115 = Post.query.get(115)
    post_116 = Post.query.get(116)
    post_117 = Post.query.get(117)
    post_118 = Post.query.get(118)


    post_121 = Post.query.get(121)
    post_122 = Post.query.get(122)
    post_123 = Post.query.get(123)
    post_124 = Post.query.get(124)


    post_125 = Post.query.get(125)
    post_126 = Post.query.get(126)
    post_127 = Post.query.get(127)
    post_128 = Post.query.get(128)


    post_131 = Post.query.get(131)
    post_132 = Post.query.get(132)
    post_133 = Post.query.get(133)
    post_134 = Post.query.get(134)


    post_135 = Post.query.get(135)
    post_136 = Post.query.get(136)
    post_137 = Post.query.get(137)
    post_138 = Post.query.get(138)

    #1
    demo_user.user_collections.append(post_12)      # user 1 TO user 2's POST
    demo_user.user_collections.append(post_22)      # user 1 TO user 3's POST
    demo_user.user_collections.append(post_23)      # user 1 TO user 3's POST

    demo_user.user_collections.append(post_15)
    demo_user.user_collections.append(post_16)
    demo_user.user_collections.append(post_17)
    demo_user.user_collections.append(post_18)

    demo_user.user_collections.append(post_25)
    demo_user.user_collections.append(post_26)
    demo_user.user_collections.append(post_27)
    demo_user.user_collections.append(post_28)
    demo_user.user_collections.append(post_29)

    #2
    clara_user.user_collections.append(post_2)      # user 2 TO user 1's POST
    clara_user.user_collections.append(post_4)      # user 2 TO user 1's POST
    clara_user.user_collections.append(post_24)     # user 2 TO user 3's POST

    #3
    john_user.user_collections.append(post_3)       # user 3 TO user 1's POST
    john_user.user_collections.append(post_13)      # user 3 TO user 2's POST
    john_user.user_collections.append(post_14)      # user 3 TO user 2's POST

    #4
    emily_user = User.query.get(4)

    emily_user.user_collections.append(post_31)
    emily_user.user_collections.append(post_32)
    emily_user.user_collections.append(post_33)
    emily_user.user_collections.append(post_34)

    #5
    sarah_user = User.query.get(5)

    sarah_user.user_collections.append(post_35)
    sarah_user.user_collections.append(post_36)
    sarah_user.user_collections.append(post_37)
    sarah_user.user_collections.append(post_38)


    #6
    amy_user = User.query.get(6)

    amy_user.user_collections.append(post_41)
    amy_user.user_collections.append(post_42)
    amy_user.user_collections.append(post_43)
    amy_user.user_collections.append(post_44)

    #7
    james_user = User.query.get(7)

    james_user.user_collections.append(post_45)
    james_user.user_collections.append(post_46)
    james_user.user_collections.append(post_47)
    james_user.user_collections.append(post_48)

    #8
    andrew_user = User.query.get(8)

    andrew_user.user_collections.append(post_51)
    andrew_user.user_collections.append(post_52)
    andrew_user.user_collections.append(post_53)
    andrew_user.user_collections.append(post_54)

    #9
    blake_user = User.query.get(9)

    blake_user.user_collections.append(post_55)
    blake_user.user_collections.append(post_56)
    blake_user.user_collections.append(post_57)
    blake_user.user_collections.append(post_58)

    #10
    felix_user = User.query.get(10)

    felix_user.user_collections.append(post_61)
    felix_user.user_collections.append(post_62)
    felix_user.user_collections.append(post_63)
    felix_user.user_collections.append(post_64)

    #11
    gabriel_user = User.query.get(11)

    gabriel_user.user_collections.append(post_65)
    gabriel_user.user_collections.append(post_66)
    gabriel_user.user_collections.append(post_67)
    gabriel_user.user_collections.append(post_68)

    #12
    holden_user = User.query.get(12)

    holden_user.user_collections.append(post_71)
    holden_user.user_collections.append(post_72)
    holden_user.user_collections.append(post_73)
    holden_user.user_collections.append(post_74)

    #13
    ian_user = User.query.get(13)

    ian_user.user_collections.append(post_75)
    ian_user.user_collections.append(post_76)
    ian_user.user_collections.append(post_77)
    ian_user.user_collections.append(post_78)

    #14
    kyle_user = User.query.get(14)

    kyle_user.user_collections.append(post_81)
    kyle_user.user_collections.append(post_82)
    kyle_user.user_collections.append(post_83)
    kyle_user.user_collections.append(post_84)

    #15
    lucas_user = User.query.get(15)

    lucas_user.user_collections.append(post_85)
    lucas_user.user_collections.append(post_86)
    lucas_user.user_collections.append(post_87)
    lucas_user.user_collections.append(post_88)

    #16
    mando_user = User.query.get(16)

    mando_user.user_collections.append(post_91)
    mando_user.user_collections.append(post_92)
    mando_user.user_collections.append(post_93)
    mando_user.user_collections.append(post_94)

    #17
    nic_user = User.query.get(17)

    nic_user.user_collections.append(post_95)
    nic_user.user_collections.append(post_96)
    nic_user.user_collections.append(post_97)
    nic_user.user_collections.append(post_98)

    #18
    olivia_user = User.query.get(18)

    olivia_user.user_collections.append(post_101)
    olivia_user.user_collections.append(post_102)
    olivia_user.user_collections.append(post_103)
    olivia_user.user_collections.append(post_104)

    #19
    patrick_user = User.query.get(19)

    patrick_user.user_collections.append(post_105)
    patrick_user.user_collections.append(post_106)
    patrick_user.user_collections.append(post_107)
    patrick_user.user_collections.append(post_108)

    #20
    quinn_user = User.query.get(20)

    quinn_user.user_collections.append(post_111)
    quinn_user.user_collections.append(post_112)
    quinn_user.user_collections.append(post_113)
    quinn_user.user_collections.append(post_114)

    #21
    richard_user = User.query.get(21)

    richard_user.user_collections.append(post_115)
    richard_user.user_collections.append(post_116)
    richard_user.user_collections.append(post_117)
    richard_user.user_collections.append(post_118)

    #22
    taylor_user = User.query.get(22)

    taylor_user.user_collections.append(post_121)
    taylor_user.user_collections.append(post_122)
    taylor_user.user_collections.append(post_123)
    taylor_user.user_collections.append(post_124)

    #23
    victoria_user = User.query.get(23)

    victoria_user.user_collections.append(post_125)
    victoria_user.user_collections.append(post_126)
    victoria_user.user_collections.append(post_127)
    victoria_user.user_collections.append(post_128)

    #24
    walter_user = User.query.get(24)

    walter_user.user_collections.append(post_131)
    walter_user.user_collections.append(post_132)
    walter_user.user_collections.append(post_133)
    walter_user.user_collections.append(post_134)


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
