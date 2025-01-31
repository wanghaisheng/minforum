import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Transaction, User } from 'components/api/model';
import { withAuth, asyncForEach } from 'components/api/utils';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let search: any = req.query.q;
      let amount = isNaN(search) ? 0 : Number(search);
      let offset = 0,
        page = Number(req.query.page),
        limit = Number(req.query.limit);

      if (page > 1) {
        offset = limit * page;
        offset = offset - limit;
      }

      await Transaction.orderBy(r.desc('createdAt'))
        .filter((plan) =>
          plan('referenceId')
            .match(search)
            .or(plan('userId').match(search))
            .or(
              plan('narration')
                .match(`(?i)${search}`)
                .or(
                  plan('amount')
                    .eq(amount)
                    .or(plan('status').match(`(?i)${search}`))
                )
            )
        )
        .then(async (count) => {
          await Transaction.orderBy(r.desc('createdAt'))
            .filter((plan) =>
              plan('referenceId')
                .match(search)
                .or(plan('userId').match(search))
                .or(
                  plan('narration')
                    .match(`(?i)${search}`)
                    .or(
                      plan('amount')
                        .eq(amount)
                        .or(plan('status').match(`(?i)${search}`))
                    )
                )
            )
            .skip(offset)
            .limit(limit)
            .getJoin()
            .then(async (data) => {
              let transactions: any = [];
              await asyncForEach(data, async (item: any) => {
                let user = await User.get(item.userId);
                let { name, email } = user;
                item.user = { email, name };
                transactions.push(item);
              }).finally(() => {
                res.status(200).json({
                  success: true,
                  data: transactions,
                  count: count.length
                });
              });
            });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default search;
